import { Directive, OnInit, ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
    selector: '[matTooltip][appShowIfTruncated]'
})
export class ShowIfTruncatedDirective implements OnInit {
    constructor(
        private matTooltip: MatTooltip,
        private elementRef: ElementRef<HTMLElement>
    ) {
    }

    public ngOnInit(): void {
        // Wait for DOM update
        setTimeout(() => {
            const element = this.elementRef.nativeElement;
            this.matTooltip.disabled = element.scrollWidth <= element.clientWidth;
        });
    }
};
