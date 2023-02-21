import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { ltTo } from './validator';

const EQUAL_TO_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => LessThanToValidator),
    multi: true
};

@Directive({
    // tslint:disable-next-line
    selector: '[ltTo][formControlName],[ltTo][formControl],[ltTo][ngModel]',
    providers: [EQUAL_TO_VALIDATOR]
})
// tslint:disable-next-line
export class LessThanToValidator implements Validator, OnInit {
    @Input() lessTo: FormControl;

    private validator: ValidatorFn;

    ngOnInit() {
        this.validator = ltTo(this.lessTo);
    }

    validate(c: AbstractControl): {[key: string]: any} {
        return this.validator(c);
    }
}
