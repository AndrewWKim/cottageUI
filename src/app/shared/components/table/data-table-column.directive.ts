import { Directive, Input, TemplateRef, ContentChild, Output, EventEmitter } from '@angular/core';
import { UIUtils } from 'app/shared/utils/ui-utils';

@Directive({
    selector: 'data-table-column'
})
export class DataTableColumnDirective {
    private _cssClass: any;
    private _cellCssClass: any;

    @Input() title: string;
    @Input() name?: string;
    @Input() sortable = false;

    @Input() set cssClass(value: any) { this._cssClass = UIUtils.parseCss(value) }
    get cssClass(): any { return this._cssClass }

    @Input() set cellCssClass(value: any) { this._cellCssClass = UIUtils.parseCss(value) }
    get cellCssClass(): any { return this._cellCssClass }

    @Output() onSelect = new EventEmitter<any>()

    @ContentChild(TemplateRef, /* TODO: add static flag */ {}) template

    constructor() { }
}
