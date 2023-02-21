import { Routes, RouterModule } from '@angular/router';
import { CottagesComponent } from 'app/cottages/cottages.component';
import { CottagesListComponent } from 'app/cottages/cottages-list/cottages-list.component';
import { CottageCreateComponent } from 'app/cottages/cottage-create/cottage-create.component';
import { CottageEditComponent } from 'app/cottages/cottage-edit/cottage-edit.component';
import { CottageDetailsResolver } from 'app/cottages/shared/cottage-details-resolver.service';

const cottagesRoutes: Routes = [
    {
        path: '',
        component: CottagesComponent,
        children: [
            { path: '', component: CottagesListComponent },
            {
                path: 'create',
                component: CottageCreateComponent
            },
            {
                path: ':id',
                component: CottageEditComponent,
                resolve: {
                    cottage: CottageDetailsResolver
                }
            }
        ]
    }
]

export const CottagesRouting = RouterModule.forChild(cottagesRoutes)
