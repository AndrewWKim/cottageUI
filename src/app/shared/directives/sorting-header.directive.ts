import { Directive, ElementRef, Input, OnChanges, AfterViewInit, SimpleChanges, Renderer2 } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Directive({
    selector: '[sorting-header]'
})
export class SortingHeaderDirective implements OnChanges, AfterViewInit {
    @Input() columnName: string;
    @Input() sortingColumn: string;
    @Input() sortingType: number;

    private iconString = '';
    private iconBody: any;
    private text: any;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    }

    ngAfterViewInit() {
        this.iconBody = this.renderer.createElement('mat-icon');
        this.text = this.renderer.createText(this.iconString);
        this.renderer.appendChild(this.iconBody, this.text);
        this.renderer.addClass(this.iconBody, 'mat-icon');
        this.renderer.addClass(this.iconBody, 'material-icons');
        this.renderer.addClass(this.iconBody, 'icon-16');
        this.renderer.setAttribute (this.iconBody, 'inline', 'true');
        this.renderer.appendChild(this.elementRef.nativeElement, this.iconBody);
        this.renderer.addClass(this.elementRef.nativeElement, 'pointer-cursor');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.sortingColumn || changes.sortingType) {
            if (isNullOrUndefined(this.iconBody)) {
                return;
            }

            switch (this.sortingType) {
                case 0: this.iconString = 'arrow_downward'; break;
                case 1: this.iconString = 'arrow_upward'; break;
                default: this.iconString = ''; break;
            }

            if (this.columnName !== this.sortingColumn) {
                this.iconString = '';
            }

            this.renderer.removeChild(this.iconBody, this.text);
            this.text = this.renderer.createText(this.iconString);
            this.renderer.appendChild(this.iconBody, this.text);
        }
    }
}
