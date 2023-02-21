import { JsonParser } from './model-json-parser';
import { Roles } from './roles';

export class User implements JsonParser<User> {
    id: number;
    name: string;
    role: Roles;

    public get isAdmin(): boolean {
        return this.role === Roles.Admin;
    }

    public get isSecurity(): boolean {
        return this.role === Roles.Security;
    }

    parseJson(json: any): User {
        if (json === null || json === undefined) {
            return null;
        }
        let a = json.role instanceof Number;
        const userRole = typeof json.role === 'number' ? json.role :  Roles[(json.role as string)];

        const user = new User();
        user.id = +json.id;
        user.name = json.name;
        user.role = userRole;

        return user;
    }
}
