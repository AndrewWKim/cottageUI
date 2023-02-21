
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Cottage } from 'app/models/cottage';
import { CottageService } from 'app/shared/services/cottage.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CottageDetailsResolver implements Resolve<Cottage> {
    constructor(private cottageService: CottageService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Cottage> {
        const cottageId = route.paramMap.get('id');

        return this.cottageService.getCottageById(cottageId).pipe(
            catchError(err => {
                return observableThrowError(err);
            }));
    }
}
