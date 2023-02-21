import { Injectable } from '@angular/core';
import { Response } from './response';
import {
    HttpClient,
    HttpResponse,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApplicationError } from './application-error';
import { ErrorNotificationService } from 'app/core/error-notification.service';
import { AuthenticationService } from 'app/core/authentication.service';
import { throttleTime, mergeMap, catchError, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { HttpMethods } from './http-methods';

export interface AuthorizeOptions {
    AuthorizeHeader: string;
}

@Injectable()
export class HttpClientService {
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService,
        private errorService: ErrorNotificationService) {
    }

    get(url: string, options?: any): Observable<Response> {
        return this.request(HttpMethods.Get, url, null, options);
    }

    post(url: string, body?: any, options?: any): Observable<Response> {
        return this.request(HttpMethods.Post, url, body, options);
    }

    put(url: string, body?: any, options?: any): Observable<Response> {
        return this.request(HttpMethods.Put, url, body, options);
    }

    delete(url: string, options?: any): Observable<Response> {
        return this.request(HttpMethods.Delete, url, null, options);
    }

    private request(method: string, url: string, body?: any, options?: any): Observable<Response> {
        const sendRequest = (): Observable<Response> => {
            const originalRequestOptions = this.createRequestOptions(url, body, options);
            return this.http.request<HttpResponse<any>>(method, url, originalRequestOptions).pipe(
                map((response: HttpResponse<any>) => new Response(response))
            );
        };

        return sendRequest()
    }

    private createRequestOptions(url: string, body?: any, options?: any): any {
        const baseOptions = {
            body: body,
            headers: options && options.headers
                ? options.headers
                : this.createDefaultHeaders(this.authService.isAuthenticated),
            params: options && options.params
                ? this.createHttpParams(options.params)
                : undefined,
            observe: 'response'
        };

        return baseOptions;
    }

    private createDefaultHeaders(isAuthenticated: boolean): HttpHeaders {
        let headers = new HttpHeaders();
        if (isAuthenticated) {
            headers = this.createAuthorizationHeaders(headers);
        }
        headers = this.createContentTypeHeaders(headers);
        return headers;
    }

    private createAuthorizationHeaders(headers: HttpHeaders) {
        return headers.append('Authorization', `Bearer ${this.authService.session?.token.token}`);
    }

    private createContentTypeHeaders(headers: HttpHeaders) {
        return headers
            .append('Content-Type', 'application/json')
            .append('Accepts', 'application/json');
    }

    private createHttpParams(params: any | HttpParams) {
        if (params instanceof HttpParams) {
            return params;
        }

        let httpParams = new HttpParams();

        Object.keys(params).forEach(function (key) {
            if (!isNullOrUndefined(params[key])) {
                if (Array.isArray(params[key])) {
                    for (const item of params[key]) {
                        httpParams = httpParams.append(key, item.toString());
                    }
                } else {
                    httpParams = httpParams.append(key, params[key]);
                }
            }
        });

        return httpParams;
    }
}
