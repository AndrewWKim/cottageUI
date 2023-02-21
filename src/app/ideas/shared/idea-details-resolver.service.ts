
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { IdeaService } from 'app/shared/services/idea.service';
import { Idea } from 'app/models/idea';

@Injectable()
export class IdeaDetailsResolver implements Resolve<Idea> {
    constructor(private ideaService: IdeaService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Idea> {
        const ideaId = route.paramMap.get('id');

        return this.ideaService.getIdeaById(ideaId).pipe(
            catchError(err => {
                return observableThrowError(err);
            }));
    }
}
