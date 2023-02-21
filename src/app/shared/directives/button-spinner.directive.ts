import { Directive, ElementRef, Input, OnChanges, AfterViewInit, SimpleChanges, Renderer2, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatSpinner } from '@angular/material/progress-spinner';

@Directive({
    selector: '[buttonSpinner]'
})
export class ButtonSpinnerDirective implements OnChanges, AfterViewInit, OnInit {
    @Input() buttonSpinner: boolean;

    private icon: any;
    private spinner: any;

    constructor(private elementRef: ElementRef,
        private renderer: Renderer2,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.icon = this.renderer.createElement('mat-icon');
        this.renderer.addClass(this.icon, 'mat-icon');
        this.renderer.addClass(this.icon, 'material-icons');
        this.renderer.addClass(this.icon, 'button-spinner');
        this.renderer.setAttribute(this.icon, 'inline', 'true');
        const factory = this.componentFactoryResolver.resolveComponentFactory(MatSpinner);
        const componentRef = this.viewContainerRef.createComponent(factory);
        this.spinner = componentRef.instance;
        this.spinner.strokeWidth = 3;
        this.spinner.diameter = 20;
        this.renderer.appendChild(this.icon, this.spinner._elementRef.nativeElement);
    }

    ngAfterViewInit() {
        this.switchView(this.buttonSpinner);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.buttonSpinner) {
            if (isNullOrUndefined(this.icon)) {
                return;
            }

            this.switchView(changes.buttonSpinner.currentValue);
        }
    }

    private switchView(disabled: boolean) {
        if (disabled) {
            this.renderer.appendChild(this.elementRef.nativeElement, this.icon);
        } else {
            this.renderer.removeChild(this.elementRef.nativeElement, this.icon);
        }
    }
}
