
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ClientService } from 'app/shared/services/client.service';
import { Client } from 'app/models/client';

@Injectable()
export class ResidentDetailsResolver implements Resolve<Client> {
    constructor(private clientService: ClientService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Client> {
        const residentId = route.paramMap.get('id');

        return this.clientService.getClientById(residentId).pipe(
            catchError(err => {
                return observableThrowError(err);
            }));
    }
}
