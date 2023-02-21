import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appLimitToMax]'
})
export class LimitToMaxDirective {
    private el: HTMLInputElement;

    constructor(private elementRef: ElementRef) {
        this.el = this.elementRef.nativeElement;
    }
    @HostListener('input', ['$event']) onchange(event: any) {
        let value = this.el.value;
        let max = this.el.max;

        if (Number(value) > Number(max)) {
            this.el.value = max
            let event = new Event('input', { bubbles: true });
            this.el.dispatchEvent(event);
        }
    }
}