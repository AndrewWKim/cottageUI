import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { Cottage } from 'app/models/cottage';
import { CottageService } from 'app/shared/services/cottage.service';
import { CommonService } from 'app/shared/services/common.service';
import { AlertConfig, AlertService } from 'app/shared/services/alert.service';
import { StorageUtils } from 'app/shared/utils/storage-utils';

const COTTAGE_PAGINATION_KEY = 'COTTAGE_COTTAGES_PAGINATION';

@Component({
    selector: 'app-cottages-list',
    templateUrl: './cottages-list.component.html',
    styleUrls: ['./cottages-list.component.css']
})
export class CottagesListComponent implements OnInit {
    public displayedColumns = ['cottageNumber', 'area', 'action'];
    public dataSource: CottagesDataSource | null;
    public cottages: Cottage[] = [];
    public paging = {
        total: 0,
        pageIndex: 0,
        limit: 10
    };

    public reloadData = _.debounce(this._reloadData, 0);

    constructor(
        private cottageService: CottageService,
        private router: Router,
        private commonService: CommonService,
        private alertService: AlertService) {
        const storagePagination = StorageUtils.getItem(COTTAGE_PAGINATION_KEY);
        this.paging = storagePagination || this.paging;
    }

    ngOnInit() {
        this.reloadData();
    }

    pageChanged(pageInfo) {
        this.paging.pageIndex = pageInfo.pageIndex;
        this.paging.limit = pageInfo.pageSize;
        StorageUtils.setItem(COTTAGE_PAGINATION_KEY, this.paging);
        this.reloadData();
    }

    getMeterDeclension(areaNumber: number): string {
        const areaInteger = Math.trunc(areaNumber);
        const areaString = areaInteger.toString();
        if (areaInteger % 10 === 1 || areaInteger === 1) {
            return 'сотка'
        } else if (areaString.endsWith('2') || areaString.endsWith('3') || areaString.endsWith('4')) {
            return 'сотки'
        }
        return 'соток'
    }

    tryGoToCreate() {
        this.commonService.getLeftCottagesArea().subscribe(data => {

            if (data <= 0) {
                this.alertService.showError('Общая площадь уже полностью занята', new AlertConfig(2000));
                return
            }

            this.router.navigate(['cottages/create']);
        });
    }

    protected edit(cottageId: number) {
        this.router.navigate(['cottages', cottageId])
    }

    private _reloadData() {
        this.cottageService.listAll(this.paging.pageIndex, this.paging.limit)
            .subscribe(
                response => {
                    this.paging.total = response.total;
                    this.dataSource = new CottagesDataSource(response.cottages);
                });
    }
}

export class CottagesDataSource extends DataSource<any> {
    constructor(private cottages: Cottage[]) {
        super();
    }
    connect(): Observable<Cottage[]> {
        return of(this.cottages);
    }
    disconnect() { }
}
