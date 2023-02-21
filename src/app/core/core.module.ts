import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { throwIfAlreadyLoaded } from 'app/core/module-import.guard';
import { HttpClientService } from 'app/core/http-client.service';
import { ErrorNotificationService } from 'app/core/error-notification.service';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from 'app/core/auth.guard';
import { GlobalErrorHandler } from 'app/core/global-error-handler';
import { AlertService } from 'app/shared/services/alert.service';

@NgModule({
    providers: [
        AuthGuard,
        HttpClientService,
        ErrorNotificationService,
        AuthenticationService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        AlertService
    ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
