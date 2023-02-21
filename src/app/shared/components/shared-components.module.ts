import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'app/shared/components/table/table.module';
import { WarningLabelComponent } from 'app/shared/components/warning-label/warning-label.component';
import { TextInputComponent } from 'app/shared/components/text-input/text-input.component';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { TextMaskModule } from 'angular2-text-mask';
import { TimeRangeComponent } from './time-range/time-range.component';
import { TimePickerComponent } from './time-picker/time-picker.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DeviceBatteryReplacementDialogComponent } from './device-battery-replacement-dialog/device-battery-replacement-dialog.component';
import { PropertyItemComponent } from './property-item/property-item.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { MatChipsModule } from '@angular/material/chips';
import { CarSelectorComponent } from './car-selector/car-selector.component';
import { getRuPaginatorIntl } from '../utils/ru-paginator-intl';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        TableModule,
        SharedPipesModule,
        SharedDirectivesModule,
        MatDialogModule,
        MatSnackBarModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        TextMaskModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatChipsModule,
        MatCheckboxModule,
    ],
    declarations: [
        WarningLabelComponent,
        TextInputComponent,
        ConfirmationDialogComponent,
        InfoDialogComponent,
        TimeRangeComponent,
        TimePickerComponent,
        DatePickerComponent,
        DeviceBatteryReplacementDialogComponent,
        PropertyItemComponent,
        DateRangePickerComponent,
        CarSelectorComponent,
    ],
    exports: [
        WarningLabelComponent,
        TextInputComponent,
        TimeRangeComponent,
        TimePickerComponent,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        SharedPipesModule,
        SharedDirectivesModule,
        DatePickerComponent,
        PropertyItemComponent,
        DateRangePickerComponent,
        CarSelectorComponent,
        ConfirmationDialogComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent,
        InfoDialogComponent,
        DeviceBatteryReplacementDialogComponent
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getRuPaginatorIntl() }
    ]
})
export class SharedComponentsModule { }
