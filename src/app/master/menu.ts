import { Roles } from 'app/models/roles';
import { MenuItem } from './menu-item';
import { User } from 'app/models/user';

export class Menu {

    public static getItems(user: User): MenuItem[] {
        if (!user) {
            return [];
        }

        const menuItems = this.getDefaultMenuItems();

        return menuItems.filter(x => x.roles.some(p => p === user.role));
    }

    private static getDefaultMenuItems(): MenuItem[] {
        return [
            new MenuItem('/ideas', 'Голосования', 'how_to_vote', [Roles.Admin]),
            new MenuItem('/news', 'Новости', 'sticky_note_2', [Roles.Admin]),
            new MenuItem('/cottages', 'Участки', 'home', [Roles.Admin]),
            new MenuItem('/residents', 'Жильцы', 'people', [
                Roles.Admin,
                Roles.Security,
            ]),
            new MenuItem('/cars', 'Автомобили', 'directions_car', [
                Roles.Admin,
                Roles.Security,
            ]),
            new MenuItem('/pass-requests', 'Заявки на пропуск', 'book_online', [
                Roles.Admin,
                Roles.Security,
            ]),
            new MenuItem(
                '/communal-bills',
                'Коммунальные счета',
                'pending_actions',
                [Roles.Admin]
            ),
            new MenuItem('/settings', 'Настройки', 'settings', [Roles.Admin]),
        ];
    }
}
