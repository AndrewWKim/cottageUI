import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ResidentsRouting } from 'app/residents/residents.routing';
import { ResidentsComponent } from 'app/residents/residents.component';
import { ResidentsListComponent } from 'app/residents/residents-list/residents-list.component';
import { ResidentDetailsResolver } from 'app/residents/shared/resident-details-resolver.service';
import { MatComponents } from '../app.module';
import { ResidentCreateComponent } from './resident-create/resident-create.component';
import { ResidentEditComponent } from './resident-edit/resident-edit.component';
import { ResidentFormComponent } from './shared/resident-form/resident-form.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthSharedModule } from 'app/auth/shared/auth-shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientService } from 'app/shared/services/client.service';
import { CottageService } from 'app/shared/services/cottage.service';

@NgModule({
    imports: [
        SharedModule,
        ResidentsRouting,
        MatComponents,
        TextMaskModule,
        AuthSharedModule,
        MatDialogModule
    ],
    providers: [
        ClientService,
        ResidentDetailsResolver,
        CottageService,
    ],
    declarations: [
        ResidentsComponent,
        ResidentsListComponent,
        ResidentCreateComponent,
        ResidentEditComponent,
        ResidentFormComponent
    ],
})
export class ResidentsModule {
}
