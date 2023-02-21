import { NgModule } from '@angular/core';
import { MatComponents } from '../app.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule} from '../shared/shared.module';
import { AuthRouting} from './auth.routing';
import { AuthSharedModule} from './shared/auth-shared.module';


@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
    ],
    imports: [
        SharedModule,
        MatComponents,
        AuthRouting,
        AuthSharedModule
    ],
})
export class AuthModule { }
