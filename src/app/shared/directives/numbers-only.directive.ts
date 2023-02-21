import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event']) onKeyDown(event): void {
        const e = <KeyboardEvent>event;

        if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+C
            (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+V
            (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+X
            (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }

        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }

    @HostListener('paste', ['$event']) onPaste(event): void {
        // Don't allow pasted text that contains non-numerics
        const pastedText = (event.originalEvent || event).clipboardData.getData('text/plain');

        if (pastedText) {
            const regEx = new RegExp('^[0-9]*$');
            if (!regEx.test(pastedText)) {
                event.preventDefault();
            }
        }
    }
}
