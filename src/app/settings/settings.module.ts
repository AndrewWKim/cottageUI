import { SettingsEditComponent } from './settings-edit/settings.component';
import { SettingsRouting } from './settings.routing';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './../shared/services/settings.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthSharedModule } from './../auth/shared/auth-shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { MatComponents } from './../app.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        SharedModule,
        SettingsRouting,
        MatComponents,
        TextMaskModule,
        AuthSharedModule,
        MatDialogModule,
    ],
    providers: [SettingsService],
    declarations: [SettingsComponent, SettingsEditComponent],
})
export class SettingsModule {}
