import { Routes, RouterModule } from '@angular/router';
import { CommunalBillsListComponent } from './communal-bills-list/communal-bills-list.component';
import { CommunalBillsComponent } from './communal-bills.component';

const communalBillsRoutes: Routes = [
    {
        path: '',
        component: CommunalBillsComponent,
        children: [
            { path: '', component: CommunalBillsListComponent },
        ]
    }
]

export const CommunalBillsRouting = RouterModule.forChild(communalBillsRoutes)
