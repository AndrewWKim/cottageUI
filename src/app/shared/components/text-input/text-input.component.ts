import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextInputComponent),
        multi: true
    }]
})
export class TextInputComponent implements ControlValueAccessor {
    @Input('value') _value
    @Input() disabled = false
    @Input() placeholder
    @Input() maxlength = 16
    @Output() onBlur = new EventEmitter()
    @ViewChild('textInput') textInput: ElementRef

    private _onTouched: (_: any) => {}
    private _onChange: (_: any) => {}

    get value(): string {
        return this._value
    }

    set value(val) {
        this._value = val
        this._onChange(this._value)
        this._onTouched(this._value)
    }

    constructor() { }

    clearText() {
        this.value = ''
    }

    focus() {
        this.textInput.nativeElement.focus()
    }

    onBluring(e: Event) {
        this.onBlur.emit(e)
    }

    writeValue(obj: any): void {
        if (obj) {
            this.value = obj as string
        }
    }

    registerOnChange(fn: any) {
        this._onChange = fn
    }

    registerOnTouched(fn: any) {
        this._onTouched = fn
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled
    }
}
