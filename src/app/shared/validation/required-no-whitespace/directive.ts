import { Directive, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { requiredNoWhitespace } from './validator';

const EQUAL_TO_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RequiredNoWhitespaceValidator),
    multi: true
};

@Directive({
    // tslint:disable-next-line
    selector: '[requiredNoWhitespace][formControlName],[requiredNoWhitespace][formControl],[requiredNoWhitespace][ngModel]',
    providers: [EQUAL_TO_VALIDATOR]
})
// tslint:disable-next-line
export class RequiredNoWhitespaceValidator implements Validator, OnInit {
    private validator: ValidatorFn;

    ngOnInit() {
        this.validator = requiredNoWhitespace();
    }

    validate(c: AbstractControl): {[key: string]: any} {
        return this.validator(c);
    }
}
