import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CarsRouting } from 'app/cars/cars.routing';
import { CarsComponent } from 'app/cars/cars.component';
import { CarService } from 'app/shared/services/car.service';
import { CarsListComponent } from 'app/cars/cars-list/cars-list.component';
import { MatComponents } from '../app.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthSharedModule } from 'app/auth/shared/auth-shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        SharedModule,
        CarsRouting,
        MatComponents,
        TextMaskModule,
        AuthSharedModule,
        MatDialogModule
    ],
    providers: [
        CarService,
    ],
    declarations: [
        CarsComponent,
        CarsListComponent,
    ],
})
export class CarsModule {
}
