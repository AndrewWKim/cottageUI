import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CommunalBill } from 'app/models/communal-bill';
import { BillingService } from 'app/shared/services/billing.service';
import { Months } from 'app/shared/consts/months';
import { Cottage } from 'app/models/cottage';
import { CottageService } from 'app/shared/services/cottage.service';
import { DateUtils } from 'app/shared/utils/date-utils';
import { PaymentStatus } from 'app/shared/enums/payment-status';
import { CommunalBillEditDialogComponent } from '../communal-bill-edit-dialog/communal-bill-edit-dialog';
import { AlertService } from 'app/shared/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { StorageUtils } from 'app/shared/utils/storage-utils';

const BILLS_PAGINATION_KEY = 'COTTAGE_BILLS_PAGINATION';
const BILLS_FILTER_KEY = 'COTTAGE_BILLS_FILTER';

@Component({
    selector: 'app-communal-bills-list',
    templateUrl: './communal-bills-list.component.html',
    styleUrls: ['./communal-bills-list.component.css']
})
export class CommunalBillsListComponent implements OnInit {
    public displayedColumns = ['cottageOwner', 'communalType', 'month', 'year', 'price', 'paymentStatus', 'action'];
    public dataSource: CommunalBillsDataSource | null;
    public communalBills: CommunalBill[] = [];
    public paging = {
        total: 0,
        pageIndex: 0,
        limit: 10
    };

    public months = Months;
    public cottages: Cottage[] = [];
    public years: number[];

    public paymentStatus = PaymentStatus;

    public filters: FormGroup;

    public reloadData = _.debounce(this._reloadData, 0);

    constructor(
        private billingService: BillingService,
        private fb: FormBuilder,
        private cottageService: CottageService,
        private alertService: AlertService,
        private dialog: MatDialog) {
        const storagePagination = StorageUtils.getItem(BILLS_PAGINATION_KEY);
        const storageFilter = StorageUtils.getItem(BILLS_FILTER_KEY);
        this.paging = storagePagination || this.paging;

        this.years = DateUtils.generateYears();

        this.filters = this.fb.group({
            cottageId: new FormControl(storageFilter?.id || ''),
            month: new FormControl(storageFilter?.month || ''),
            year: new FormControl(storageFilter?.year || ''),
        });

        this.filters.controls.cottageId.valueChanges.subscribe(id => {
            this.onFilterChange(id, null, null);
        });

        this.filters.controls.month.valueChanges.subscribe(month => {
            this.onFilterChange(null, month, null);
        });

        this.filters.controls.year.valueChanges.subscribe(year => {
            this.onFilterChange(null, null, year);
        });
    }

    ngOnInit() {
        this.cottageService.listAll().subscribe(cottagesData => {
            this.cottages = cottagesData.cottages;
        })
        this.reloadData();
    }

    onFilterChange(id: any, month: any, year: any) {
        this.paging.pageIndex = 0;
        this.reloadData()
        const filter = {
            id: id || this.filters.controls['cottageId'].value,
            month: month || this.filters.controls['month'].value,
            year: year || this.filters.controls['year'].value,
        }
        StorageUtils.setItem(BILLS_FILTER_KEY, filter);
    }

    getMonthName(id: number) {
        return this.months.find(m => m.id === id).name;
    }

    pageChanged(pageInfo) {
        this.paging.pageIndex = pageInfo.pageIndex;
        this.paging.limit = pageInfo.pageSize;
        StorageUtils.setItem(BILLS_PAGINATION_KEY, this.paging);
        this.reloadData();
    }

    openEditDialog(communalBill: CommunalBill): void {
        const dialogRef = this.dialog.open(CommunalBillEditDialogComponent, {
            width: '300px',
            data: communalBill
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reloadData();
        });
    }

    private _reloadData() {
        const filters = this.filters.getRawValue();

        this.billingService.listAll(this.paging.pageIndex, this.paging.limit, filters.cottageId, filters.month, filters.year)
            .subscribe(
                response => {
                    this.paging.total = response.total;
                    this.dataSource = new CommunalBillsDataSource(response.communalBills);
                });
    }
}

export class CommunalBillsDataSource extends DataSource<any> {
    constructor(private communalBills: CommunalBill[]) {
        super();
    }
    connect(): Observable<CommunalBill[]> {
        return of(this.communalBills);
    }
    disconnect() { }
}
