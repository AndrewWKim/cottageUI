import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from 'app/cars/cars.component';
import { CarsListComponent } from 'app/cars/cars-list/cars-list.component';

const carsRoutes: Routes = [
    {
        path: '',
        component: CarsComponent,
        children: [
            { path: '', component: CarsListComponent },
        ]
    }
]

export const CarsRouting = RouterModule.forChild(carsRoutes)
