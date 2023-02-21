import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CottagesRouting } from 'app/cottages/cottages.routing';
import { CottagesComponent } from 'app/cottages/cottages.component';
import { CottageService } from 'app/shared/services/cottage.service';
import { CottagesListComponent } from 'app/cottages/cottages-list/cottages-list.component';
import { CottageDetailsResolver } from 'app/cottages/shared/cottage-details-resolver.service';
import { MatComponents } from '../app.module';
import { CottageCreateComponent } from './cottage-create/cottage-create.component';
import { CottageEditComponent } from './cottage-edit/cottage-edit.component';
import { CottageFormComponent } from './shared/cottage-form/cottage-form.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthSharedModule } from 'app/auth/shared/auth-shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        SharedModule,
        CottagesRouting,
        MatComponents,
        TextMaskModule,
        AuthSharedModule,
        MatDialogModule
    ],
    providers: [
        CottageService,
        CottageDetailsResolver,
    ],
    declarations: [
        CottagesComponent,
        CottagesListComponent,
        CottageCreateComponent,
        CottageEditComponent,
        CottageFormComponent
    ],
})
export class CottagesModule {
}
