import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const withMaskNoUnderscore = (): ValidatorFn => {
    return (control: AbstractControl) => {
        const containsUnderscore = control.value.includes('_');
        return containsUnderscore ? { 'underscore': true } : null;
    };
};
