import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatComponents } from '../app.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthSharedModule } from 'app/auth/shared/auth-shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CommunalBillsRouting } from './communal-bills.routing';
import { BillingService } from 'app/shared/services/billing.service';
import { CommunalBillsComponent } from './communal-bills.component';
import { CommunalBillsListComponent } from './communal-bills-list/communal-bills-list.component';
import { CottageService } from 'app/shared/services/cottage.service';
import { CommunalBillEditDialogComponent } from './communal-bill-edit-dialog/communal-bill-edit-dialog';

@NgModule({
    imports: [
        SharedModule,
        CommunalBillsRouting,
        MatComponents,
        TextMaskModule,
        AuthSharedModule,
        MatDialogModule
    ],
    providers: [
        BillingService,
        CottageService
    ],
    declarations: [
        CommunalBillsComponent,
        CommunalBillsListComponent,
        CommunalBillEditDialogComponent
    ],
})
export class CommunalBillsModule {
}
