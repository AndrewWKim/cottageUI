import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, forwardRef, Output, EventEmitter } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATEPICKER_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  };

export const DATEPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  };

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    providers: [DATEPICKER_VALIDATORS, DATEPICKER_VALUE_ACCESSOR]
})

export class DatePickerComponent implements AfterViewInit, OnDestroy, ControlValueAccessor, Validator  {

    @Input() placeholder: string;
    @Input() errorText: string;
    @Input('value') _value;
    @Input() min: Date | string | null;
    @Input() max: Date | string | null;
    @Input() disabled: boolean;
    @Output() onBlur = new EventEmitter();
    @Output() dateChange = new EventEmitter<MatDatepickerInputEvent<Date>>();
    
    @ViewChild('datePicker', { read: ElementRef, static: true }) _datePicker: ElementRef;
    @ViewChild('datePicker', { read: MatDatepickerInput, static: true }) _datepickerInput: MatDatepickerInput<any>;

    private _onTouched: Function;
    private _onChange: Function;
    private _eventSubscription: Subscription;
    private _dateChangeEventSubscription: Subscription;

    constructor() {
        this._onChange = (_: any) => {};
        this._onTouched = () => {};
        this.disabled = false;
    }

    get value(): string {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this._onChange(this._value);
        this._onTouched();
    }

    focus() {
        this._datePicker.nativeElement.focus();
    }

    onBluring(e: Event) {
        this.onBlur.emit(e);
    }

    validate(control: AbstractControl): ValidationErrors {
        return this._datepickerInput.validate(control);
    }

    registerOnValidatorChange?(fn: () => void): void {
        this._datepickerInput.registerOnValidatorChange(fn);
    }

    writeValue(obj: any): void {
        this.value = obj as string;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngAfterViewInit(): void {
        this._eventSubscription = fromEvent(this._datePicker.nativeElement, 'input')
        .subscribe(_ => {
            this._datepickerInput._onInput(this._datePicker.nativeElement.value);
        });

        this._dateChangeEventSubscription = this._datepickerInput.dateChange.subscribe((e) => this.dateChange.emit(e));
    }
    
    ngOnDestroy(): void {
        this._eventSubscription.unsubscribe();
        this._dateChangeEventSubscription.unsubscribe(); 
    }
}
