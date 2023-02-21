import { Roles } from 'app/models/roles';

export class PermissionUtils {

    static exceptRoles(...roles: Roles[]) {
        return Object.keys(Roles).map(k => Roles[k]).filter(r => !roles.some(x => x === r));
    }

}
