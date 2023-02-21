import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const requiredNoWhitespace = (): ValidatorFn => {
    return (control: AbstractControl) => {
        const isRequired = Validators.required(control);
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isRequired && !isWhitespace;
        return isValid ? null : { 'required-no-whitespace': true }
    };
};
