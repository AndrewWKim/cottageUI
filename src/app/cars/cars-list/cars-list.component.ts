import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { Car } from 'app/models/car';
import { CarService } from 'app/shared/services/car.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { StorageUtils } from 'app/shared/utils/storage-utils';

const CARS_PAGINATION_KEY = 'COTTAGE_CARS_PAGINATION';

@Component({
    selector: 'app-cars-list',
    templateUrl: './cars-list.component.html',
    styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
    public displayedColumns = ['carLicensePlate', 'brand', 'model', 'clientFullName'];
    public dataSource: CarsDataSource | null;
    public cars: Car[] = [];
    public paging = {
        total: 0,
        pageIndex: 0,
        limit: 10
    };

    public filters: FormGroup;

    public reloadData = _.debounce(this._reloadData, 0);

    constructor(
        private carService: CarService,
        private fb: FormBuilder) {
        const storagePagination = StorageUtils.getItem(CARS_PAGINATION_KEY);
        this.paging = storagePagination || this.paging;
        this.filters = this.fb.group({
            carLicensePlate: new FormControl(''),
        });
        this.filters.controls.carLicensePlate.valueChanges
            .subscribe(() => {
                this.paging.pageIndex = 0;
                this.reloadData()
            });
    }

    ngOnInit() {
        this.reloadData();
    }

    pageChanged(pageInfo) {
        this.paging.pageIndex = pageInfo.pageIndex;
        this.paging.limit = pageInfo.pageSize;
        StorageUtils.setItem(CARS_PAGINATION_KEY, this.paging);
        this.reloadData();
    }

    private _reloadData() {
        const filters = this.filters.getRawValue();
        const carLicensePlate = filters.carLicensePlate;

        this.carService.listAll(this.paging.pageIndex, this.paging.limit, carLicensePlate)
            .subscribe(
                response => {
                    this.paging.total = response.total;
                    this.dataSource = new CarsDataSource(response.cars);
                });
    }
}

export class CarsDataSource extends DataSource<any> {
    constructor(private cars: Car[]) {
        super();
    }
    connect(): Observable<Car[]> {
        return of(this.cars);
    }
    disconnect() { }
}
