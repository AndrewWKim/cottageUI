import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Credentials } from './../models/credentials';
import {
    HttpClient,
    HttpHeaders,
    HttpResponse,
    HttpParams,
    HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, throwError, EMPTY } from 'rxjs';
import { OAuthToken } from './../models/oauth-token';
import { OAuthError } from './../models/oauth-error';
import { Session } from 'app/models/session';
import { Router } from '@angular/router';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';

const SESSION_KEY = 'COTTAGE_SESSION';

@Injectable()
export class AuthenticationService {
    private _session: Session;

    constructor(private http: HttpClient, private router: Router) {
        this.restoreSession();
    }

    get isAuthenticated(): boolean {
        return this.session !== null;
    }

    get session(): Session {
        if (this._session) {
            return this._session;
        }
        this._session = this.restoreSession();

        return this._session;
    }

    resetSession() {
        localStorage.removeItem(SESSION_KEY);
        this._session = null;
    }

    login(credentials: Credentials): Observable<any> {
        return this.requestToken(credentials).pipe(
            mergeMap(
                token => this.getUser(token.token),
                (token, user) => ({ token, user })),
            tap(data => this.createSession(data.token, data.user))
        );
    }

    logout(): void {
        this.router.navigate(['/auth/login']).then(() => this.resetSession());
    }

    refreshAuthentication(): Observable<OAuthError | OAuthToken> {
        return this.requestRefreshToken()
        .pipe(
            mergeMap(token => this.getUser(token.token), (token, user) => ({ token, user })),
            tap(data => this.createSession(data.token, data.user)),
            map(data => data.token)
        );
    }

    refreshUser(): Observable<OAuthError | OAuthToken> {
        const token = this.session.token;
        return this.getUser(token.token).pipe(
            tap(user => this.createSession(token, user)),
            map(data => token)
        );
    }

    private requestToken(credentials: Credentials): Observable<OAuthToken> {
        const params = new HttpParams()
            .set('client_id', environment.clientId)
            .set('grant_type', 'password')
            .set('username', credentials.username)
            .set('password', credentials.password);

        return this.getToken(params).pipe(
            catchError(err => this.handleOAuthError(err, 'Can\'t acquire the access token.'))
        );
    }

    private getToken(params: HttpParams): Observable<OAuthToken> {
        const headers = new HttpHeaders(
            { 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post<HttpResponse<any>>(`${environment.authServerUrl}/connect/token`, params, { headers }).pipe(
            map(response => response as any),
            map(json => new OAuthToken(
                json.access_token,
                json.refresh_token,
                json.expires_in))
        );
    }

    private requestRefreshToken(): Observable<OAuthToken> {
        const params = new HttpParams()
            .set('client_id', environment.clientId)
            .set('grant_type', 'refresh_token')
            .set('refresh_token', this.session.token.refreshToken);

        return this.getToken(params).pipe(
            catchError(error => this.handleOAuthError(error, 'Can\'t refresh the token.')),
            catchError(error => {
                this.logout();
                return EMPTY;
            })
        );
    }

    private getUser(token: string): Observable<User> {
        const headers = new HttpHeaders({ Authorization : `Bearer ${token}` });
        const user = new User();
        return this.http.get(`${environment.authServerUrl}/connect/userinfo`, { headers })
            .pipe(map(r => user.parseJson(r)));
    }

    private handleOAuthError(response: HttpErrorResponse, defaultErrorMessage?: string) {
        let error: string;
        let errorDescritpion: string;
        const responseError = response.error;

        if (responseError instanceof ErrorEvent) {
            error = 'error';
            errorDescritpion = responseError.message ? responseError.message : responseError.toString();
        } else {
            const e = responseError as any;
            error = e.error;
            errorDescritpion = typeof e.error_description !== 'undefined'
                ? e.error_description
                : defaultErrorMessage;
        }

        return throwError(new OAuthError(error, errorDescritpion));
    }

    private restoreSession(): Session {
        const sessionJson = localStorage.getItem(SESSION_KEY);
        const sessionJS = JSON.parse(sessionJson);
        const session = Session.fromJson(sessionJS);

        return (session !== null && session.isValid)
            ? session
            : null;
    }

    private createSession(token: OAuthToken, user: User) {
        const session = new Session(token, user);
        this._session = session;
        localStorage.setItem(SESSION_KEY, session.toJson());
    }
}
