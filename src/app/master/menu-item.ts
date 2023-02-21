import { Roles } from 'app/models/roles';

export class MenuItem {
    constructor(
        public url: string,
        public title: string,
        public icon: string,
        public roles: Roles[]) {
    }
}
