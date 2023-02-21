import { throwError as observableThrowError, Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { NewsService } from 'app/shared/services/news.service';
import { News } from 'app/models/news';

@Injectable()
export class NewsDetailsResolver implements Resolve<News> {
    constructor(private newsService: NewsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<News> {
        const newsId = route.paramMap.get('id');

        return this.newsService.getNewsById(newsId).pipe(
            catchError((err) => {
                return observableThrowError(err);
            })
        );
    }
}
