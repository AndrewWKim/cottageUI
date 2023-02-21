import { Routes, RouterModule } from '@angular/router';
import { PassRequestsComponent } from './pass-requests.component';
import { PassRequestsListComponent } from './pass-requests-list/pass-requests-list.component';

const passRequestsRoutes: Routes = [
    {
        path: '',
        component: PassRequestsComponent,
        children: [
            { path: '', component: PassRequestsListComponent },
        ]
    }
]

export const PassRequestsRouting = RouterModule.forChild(passRequestsRoutes)
