import { Directive, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { withMaskNoUnderscore } from './validator';

const EQUAL_TO_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => WithMaskNoUnderscoreValidator),
    multi: true
};

@Directive({
    // tslint:disable-next-line
    selector: '[requiredNoWhitespace][formControlName],[requiredNoWhitespace][formControl],[requiredNoWhitespace][ngModel]',
    providers: [EQUAL_TO_VALIDATOR]
})
// tslint:disable-next-line
export class WithMaskNoUnderscoreValidator implements Validator, OnInit {
    private validator: ValidatorFn;

    ngOnInit() {
        this.validator = withMaskNoUnderscore();
    }

    validate(c: AbstractControl): {[key: string]: any} {
        return this.validator(c);
    }
}