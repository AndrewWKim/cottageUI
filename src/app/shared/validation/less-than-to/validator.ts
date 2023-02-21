import { AbstractControl, ValidatorFn } from '@angular/forms';

export const ltTo = (lessControl: AbstractControl): ValidatorFn => {
    let subscribe = false;

    return (control: AbstractControl): {[key: string]: boolean} => {
        if (!subscribe) {
            subscribe = true;
            lessControl.valueChanges.subscribe(() => {
                control.updateValueAndValidity();
            });
        }

        const v: number = +control.value;
        return v < +lessControl.value ? null : {ltTo: true};
    };
};
