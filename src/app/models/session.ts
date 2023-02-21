import { OAuthToken } from './oauth-token';
import { User } from './user';
import { Roles } from 'app/models/roles';

export class Session {
    private _user: User;
    private _token: OAuthToken;

    static fromJson(json: any): Session {
        if (json === null || typeof json === 'undefined') {
            return null;
        }

        const { token } = json;
        const user = new User().parseJson(json.user);
        return new Session(
            OAuthToken.parseJson(token),
            user);
    }

    constructor(token: OAuthToken, user: User) {
        this._user = user instanceof User ? user : new User().parseJson(user);
        this._token = token;
    }

    get user() { return this._user; }

    get token() { return this._token; }

    get isValid(): boolean {
        return this.user !== null && this.token !== null;
    }

    get isExpired(): boolean {
        return this.token.expires < new Date();
    }

    toJson(): string {
        const data = {
            token: this.token.toJSObject(),
            user: this.user
        };

        return JSON.stringify(data, null, 2);
    }
}
