import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, BehaviorSubject, empty } from 'rxjs'
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators'
import { ApplicationError } from './application-error'
import { ErrorNotificationService } from './error-notification.service'
import { OAuthToken } from 'app/models/oauth-token'
import { AuthenticationService } from 'app/core/authentication.service'

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    private _isRefreshingToken = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private errorService: ErrorNotificationService,
        private authService: AuthenticationService) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(err => {
                    if ([401].some(status => status === err.status)) {
                        return this.handleUnauthorized(req, next);
                    }
                    if ([400, 403, 422].some(status => status === err.status)) {
                        return this.handleGenericError(err);
                    }
                    if ([500, 522].some(status => status === err.status)) {
                        return this.handleGenericError(err);
                    }
                    this.errorService.notifyError(this.convertToAppError(err));
                    return empty();
                })
            );
    }

    private handleUnauthorized(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this._isRefreshingToken) {
            this._isRefreshingToken = true;
            this.tokenSubject.next(null);
            return this.authService
                .refreshAuthentication()
                .pipe(
                    switchMap(newToken => {
                        const token = (<OAuthToken>newToken).token;
                        if (token) {
                            this.tokenSubject.next(token);
                            return next.handle(this.addToken(req, token));
                        }
                        return empty();
                    }),
                    finalize(() => this._isRefreshingToken = false)
                );
        } else {
            return this.tokenSubject
                .pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(this.addToken(req, token));
                    }))
        }
    }
    
    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }

    private handleGenericError(response: HttpErrorResponse): Observable<any> {
        this.errorService.notifyError(this.convertToAppError(response));
        return throwError(this.convertToAppError(response));
    }

    private convertToAppError(response: HttpErrorResponse): ApplicationError {
        const error = new ApplicationError();
        error.response = response;
        error.body = response.error;

        if (error.body instanceof ProgressEvent) {
            error.body = 'Приложение Cottage сейчас не доступно. Обратитесь к системному администратору.';
        }

        return error;
    }
}