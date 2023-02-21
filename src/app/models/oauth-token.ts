import * as moment from 'moment';
import { DateUtils } from 'app/shared/utils/date-utils';

export class OAuthToken {

    private _expires: Date
    private _token: string
    private _refreshToken: string

    static parseJson(json: any): OAuthToken {
        if (json === null || typeof json === 'undefined') {
            return null;
        }

        const token = new OAuthToken(
            json.token,
            json.refreshToken,
            json.expires)

        return token
    }

    constructor(token: string, refreshToken: string, expiresIn: any) {
        this._token = token
        this._refreshToken = refreshToken

        if (typeof expiresIn === 'string') {
            this._expires = new Date(expiresIn)
        } else if (typeof expiresIn === 'number') {
            this._expires = moment().add(expiresIn, 'seconds').toDate()
        }
    }

    get expires() { return this._expires }

    get token() { return this._token }

    get refreshToken() { return this._refreshToken }

    toJSObject(): any {
        return {
            token: this.token,
            refreshToken: this.refreshToken,
            expires: this.expires
        }
    }
}