import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PassRequestsRouting } from 'app/pass-requests/pass-requests.routing';
import { MatComponents } from '../app.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthSharedModule } from 'app/auth/shared/auth-shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PassRequestsListComponent } from './pass-requests-list/pass-requests-list.component';
import { PassRequestsComponent } from './pass-requests.component';
import { PassRequestService } from 'app/shared/services/pass-request.service';
import { CottageService } from 'app/shared/services/cottage.service';

@NgModule({
    imports: [
        SharedModule,
        PassRequestsRouting,
        MatComponents,
        TextMaskModule,
        AuthSharedModule,
        MatDialogModule,
    ],
    providers: [
        PassRequestService,
        CottageService,
    ],
    declarations: [
        PassRequestsComponent,
        PassRequestsListComponent
    ],
})
export class PassRequestsModule {
}
