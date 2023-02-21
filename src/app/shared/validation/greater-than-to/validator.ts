import { AbstractControl, ValidatorFn } from '@angular/forms';

export const gtTo = (greaterControl: AbstractControl): ValidatorFn => {
    let subscribe = false;

    return (control: AbstractControl): {[key: string]: boolean} => {
        if (!subscribe) {
            subscribe = true;
            greaterControl.valueChanges.subscribe(() => {
                control.updateValueAndValidity();
            });
        }

        const v: number = +control.value;
        return v > +greaterControl.value ? null : {gtTo: true};
    };
};
