import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of, forkJoin } from 'rxjs';
import * as _ from 'lodash';
import { ClientService } from 'app/shared/services/client.service';
import { Client } from 'app/models/client';
import { ClientTypes } from 'app/models/client-types';
import { ResidentType } from 'app/models/residentType';
import { CommonService } from 'app/shared/services/common.service';
import { StorageUtils } from 'app/shared/utils/storage-utils';
import { AuthenticationService } from 'app/core/authentication.service';
import { User } from 'app/models/user';

const RESIDENTS_PAGINATION_KEY = 'COTTAGE_RESIDENTS_PAGINATION';

@Component({
    selector: 'app-residents-list',
    templateUrl: './residents-list.component.html',
    styleUrls: ['./residents-list.component.css'],
})
export class ResidentsListComponent implements OnInit {
    public displayedColumns;
    public dataSource: ResidentsDataSource | null;
    public residents: Client[] = [];
    public residentTypes: ResidentType[] = [];
    public clientTypes = ClientTypes;
    public currentUser: User;


    public paging = {
        total: 0,
        pageIndex: 0,
        limit: 10,
    };

    public reloadData = _.debounce(this._reloadData, 0);

    constructor(
        private clientService: ClientService,
        private router: Router,
        private commonService: CommonService,
        private authService: AuthenticationService) {
        const storagePagination = StorageUtils.getItem(RESIDENTS_PAGINATION_KEY);
        this.paging = storagePagination || this.paging;
    }

    ngOnInit() {
        this.reloadData();
        this.currentUser = this.authService.session.user;
        this.displayedColumns = this.currentUser.isSecurity
            ? [
                'residentFullName',
                'cottageNumber',
                'residentType',
                'phoneNumber'
            ]
            : [
                'mobileAppAccessibility',
                'residentFullName',
                'cottageNumber',
                'residentType',
                'registrationCode',
                'loginName',
                'action',
            ];
    }

    pageChanged(pageInfo) {
        this.paging.pageIndex = pageInfo.pageIndex;
        this.paging.limit = pageInfo.pageSize;
        StorageUtils.setItem(RESIDENTS_PAGINATION_KEY, this.paging);
        this.reloadData();
    }

    getResidentType(residentTypeId: number): string {
        var residentType = this.residentTypes.find((r) => r.id == residentTypeId);

        if (!residentType) {
            return 'Владелец';
        }

        return residentType.type;
    }

    getMobileAppAccessibility(clientType: ClientTypes): string {
        switch (clientType) {
            case ClientTypes.Resident:
                return 'lock';
            default:
                return 'check_circle';
        }
    }

    getResidentStatus(active: boolean): string {
        return active ? 'Активный' : 'Не активный';
    }

    getClientAllowedActions(canPay: boolean, canVote: boolean): string {
        let allowedActions = canPay
            ? canVote
                ? '(Платежи, голосования)'
                : '(Платежи)'
            : canVote
                ? '(Голосования)'
                : '-';
        return allowedActions;
    }

    protected edit(residentId: number) {
        this.router.navigate(['residents', residentId]);
    }

    private _reloadData() {
        forkJoin(
            this.commonService.getResidentTypes(),
            this.clientService.listAll(
                ClientTypes.All,
                this.paging.pageIndex,
                this.paging.limit
            )
        ).subscribe(([residentTypes, clientsData]) => {
            this.paging.total = clientsData.total;
            this.dataSource = new ResidentsDataSource(clientsData.clients);
            this.residentTypes = residentTypes;
        });
    }
}

export class ResidentsDataSource extends DataSource<any> {
    constructor(private residents: Client[]) {
        super();
    }
    connect(): Observable<Client[]> {
        return of(this.residents);
    }
    disconnect() { }
}
