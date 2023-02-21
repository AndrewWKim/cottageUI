import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { gtTo } from './validator';

const EQUAL_TO_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => GreaterThanToValidator),
    multi: true
};

@Directive({
    // tslint:disable-next-line
    selector: '[gtTo][formControlName],[gtTo][formControl],[gtTo][ngModel]',
    providers: [EQUAL_TO_VALIDATOR]
})
// tslint:disable-next-line
export class GreaterThanToValidator implements Validator, OnInit {
    @Input() greaterTo: FormControl;

    private validator: ValidatorFn;

    ngOnInit() {
        this.validator = gtTo(this.greaterTo);
    }

    validate(c: AbstractControl): {[key: string]: any} {
        return this.validator(c);
    }
}
