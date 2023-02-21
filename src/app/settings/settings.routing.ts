import { SettingsEditComponent } from 'app/settings/settings-edit/settings.component';
import { SettingsComponent } from './settings.component';
import { Routes, RouterModule } from '@angular/router';

const settingsRoutes: Routes = [
    {
        path: '',
        component: SettingsEditComponent,
    },
];

export const SettingsRouting = RouterModule.forChild(settingsRoutes)
