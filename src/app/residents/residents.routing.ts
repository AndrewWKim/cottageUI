import { Routes, RouterModule } from '@angular/router';
import { ResidentsComponent } from 'app/residents/residents.component';
import { ResidentsListComponent } from 'app/residents/residents-list/residents-list.component';
import { ResidentCreateComponent } from 'app/residents/resident-create/resident-create.component';
import { ResidentEditComponent } from 'app/residents/resident-edit/resident-edit.component';
import { ResidentDetailsResolver } from 'app/residents/shared/resident-details-resolver.service';

const residentsRoutes: Routes = [
    {
        path: '',
        component: ResidentsComponent,
        children: [
            { path: '', component: ResidentsListComponent },
            {
                path: 'create',
                component: ResidentCreateComponent
            },
            {
                path: ':id',
                component: ResidentEditComponent,
                resolve: {
                    resident: ResidentDetailsResolver
                }
            }
        ]
    }
]

export const ResidentsRouting = RouterModule.forChild(residentsRoutes)
