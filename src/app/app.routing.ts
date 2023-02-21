import { AuthGuard } from './core/auth.guard'
import { Routes, RouterModule } from '@angular/router'
import { NotFoundComponent } from './not-found/not-found.component'
import { MasterComponent } from './master/master.component'

const appRoutes: Routes = [
    {
        path: '', component: MasterComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'ideas', pathMatch: 'full' },
            {
                path: 'ideas',
                loadChildren: () => import('app/ideas/ideas.module').then(m => m.IdeasModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'news',
                loadChildren: () => import('app/news/news.module').then(m => m.NewsModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'cottages',
                loadChildren: () => import('app/cottages/cottages.module').then(m => m.CottagesModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'residents',
                loadChildren: () => import('app/residents/residents.module').then(m => m.ResidentsModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'cars',
                loadChildren: () => import('app/cars/cars.module').then(m => m.CarsModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'pass-requests',
                loadChildren: () => import('app/pass-requests/pass-requests.module').then(m => m.PassRequestsModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'communal-bills',
                loadChildren: () => import('app/communal-bills/communal-bills.module').then(m => m.CommunalBillsModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'settings',
                loadChildren: () => import('app/settings/settings.module').then(m => m.SettingsModule),
                canActivate: [AuthGuard],
            }
        ]
    },
    { path: 'auth', loadChildren: () => import('app/auth/auth.module').then(m => m.AuthModule) },
    { path: '**', component: NotFoundComponent }
]

export const AppRouting = RouterModule.forRoot(appRoutes)
