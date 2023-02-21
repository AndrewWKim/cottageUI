import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

const authRoutes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full'},
            { path: 'login', component: LoginComponent },
        ]
    }
];

export const AuthRouting = RouterModule.forChild(authRoutes);
