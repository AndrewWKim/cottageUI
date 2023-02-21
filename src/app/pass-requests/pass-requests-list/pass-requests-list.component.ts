import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of, fromEvent, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PassRequest } from 'app/models/pass-request';
import { PassRequestService } from 'app/shared/services/pass-request.service';
import { PassRequestType } from 'app/shared/enums/pass-request-type';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { Cottage } from 'app/models/cottage';
import { CottageService } from 'app/shared/services/cottage.service';
import { StorageUtils } from 'app/shared/utils/storage-utils';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';

const PASS_REQUEST_PAGINATION_KEY = 'COTTAGE_PASS_REQUEST_PAGINATION';
const PASS_REQUEST_FILTER_KEY = 'COTTAGE_PASS_REQUEST_FILTER';

@Component({
    selector: 'app-pass-requests-list',
    templateUrl: './pass-requests-list.component.html',
    styleUrls: ['./pass-requests-list.component.css'],
})
export class PassRequestsListComponent
    implements OnInit, AfterViewInit, OnDestroy {
    public displayedColumns = [
        'passRequestType',
        'carLicensePlate',
        'carBrand',
        'carModel',
        'visitDate',
        'visitTime',
        'additionalInfo',
        'clientName',
        'cottageNumber',
        'action',
    ];
    public dataSource: PassRequestsDataSource | null;
    public passRequests: PassRequest[] = [];
    public passRequestTypes = PassRequestType;
    public paging = {
        total: 0,
        pageIndex: 0,
        limit: 10,
    };

    cottages: Cottage[] = [];

    public filters: FormGroup;

    public reloadData = _.debounce(this._reloadData, 0);

    @ViewChild('datePicker', { read: ElementRef, static: true })
    _datePicker: ElementRef;
    @ViewChild('datePicker', { read: MatDatepickerInput, static: true })
    _datepickerInput: MatDatepickerInput<any>;

    private _eventSubscription: Subscription;

    constructor(
        private passRequestService: PassRequestService,
        private fb: FormBuilder,
        private modal: MatDialog,
        private cottageService: CottageService
    ) {
        const storagePagination = StorageUtils.getItem(
            PASS_REQUEST_PAGINATION_KEY
        );
        const storageFilter = StorageUtils.getItem(PASS_REQUEST_FILTER_KEY);
        this.paging = storagePagination || this.paging;
        this.filters = this.fb.group({
            date: new FormControl(storageFilter?.date || null),
            cottageNumber: new FormControl(storageFilter?.cottageNumber || ''),
        });

        this.filters.controls.date.valueChanges.subscribe((date) => {
            this.onFilterChange(date, null);
        });

        this.filters.controls.cottageNumber.valueChanges.subscribe(
            (cottageNumber) => {
                this.onFilterChange(null, cottageNumber);
            }
        );
    }

    ngOnInit() {
        this.cottageService.listAll().subscribe((cottagesData) => {
            this.cottages = cottagesData.cottages;
        });
        this.reloadData();
    }

    ngAfterViewInit(): void {
        this._eventSubscription = fromEvent(
            this._datePicker.nativeElement,
            'input'
        ).subscribe(() => {
            this._datepickerInput._onInput(
                this._datePicker.nativeElement.value
            );
        });
    }

    ngOnDestroy(): void {
        this._eventSubscription.unsubscribe();
    }

    clearDate(): void {
        this.filters.patchValue({
            date: null,
        });
    }

    onFilterChange(date: any, cottageNumber: any) {
        this.paging.pageIndex = 0;
        this.reloadData();
        const filter = {
            date: date || this.filters.controls['date'].value,
            cottageNumber:
                cottageNumber || this.filters.controls['cottageNumber'].value,
        };
        StorageUtils.setItem(PASS_REQUEST_FILTER_KEY, filter);
    }

    pageChanged(pageInfo) {
        this.paging.pageIndex = pageInfo.pageIndex;
        this.paging.limit = pageInfo.pageSize;
        StorageUtils.setItem(PASS_REQUEST_PAGINATION_KEY, this.paging);
        this.reloadData();
    }

    getCorrectNameValue(passRequest: PassRequest): string {
        return passRequest.passRequestType === PassRequestType.Car
            ? passRequest.carLicensePlate
            : passRequest.visitorName;
    }

    protected delete(passRequestId: number) {
        const modalRef = this.modal.open(ConfirmationDialogComponent, {
            data: {
                message: 'Вы уверены, что хотите удалить заявку на пропуск?',
            },
        });
        modalRef.afterClosed().subscribe((result) => {
            if (result) {
                this.passRequestService
                    .delete(passRequestId)
                    .subscribe(() => this._reloadData());
            }
        });
    }

    private _reloadData() {
        const filters = this.filters.getRawValue();
        const date = filters.date
            ? formatDate(filters.date, 'MM.dd.yyyy', 'ru')
            : '';
        const cottageId = filters.cottageNumber;

        this.passRequestService
            .listAll(date, cottageId, this.paging.pageIndex, this.paging.limit)
            .subscribe((response) => {
                this.paging.total = response.total;
                this.dataSource = new PassRequestsDataSource(
                    response.passRequests
                );
            });
    }
}

export class PassRequestsDataSource extends DataSource<any> {
    constructor(private passRequests: PassRequest[]) {
        super();
    }
    connect(): Observable<PassRequest[]> {
        return of(this.passRequests);
    }
    disconnect() {}
}
