import { Component, Input, ContentChildren, QueryList, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { DataTableColumnDirective } from 'app/shared/components/table/data-table-column.directive';
import { UIUtils } from 'app/shared/utils/ui-utils';
import * as _ from 'lodash';

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html'
})
export class DataTableComponent implements AfterViewInit {
    private _cssClass: any
    private _rowCssClass: any

    @Input() items: any[]
    @Input() emptyText: string
    @Input() sortColumn?: string
    @Input() sortDirection?: string

    @Input() set cssClass(value: any) { this._cssClass = UIUtils.parseCss(value) }
    get cssClass(): any { return this._cssClass }

    @Input() set rowCssClass(value: any) {
        this._rowCssClass = UIUtils.parseCss(value)
    }

    @Output() onSelect = new EventEmitter<any>()

    @ContentChildren(DataTableColumnDirective) columns: QueryList<DataTableColumnDirective>

    constructor() { }

    ngAfterViewInit() {
        this.sort(this.columns.find(p => p.name === this.sortColumn && p.sortable))
    }

    getRowCssClass(item: any): any {
        if (this._rowCssClass instanceof Function) {
            return this._rowCssClass(item)
        }

        return this._rowCssClass
    }

    select(item: any) {
        this.onSelect.emit(item)
    }

    sort(column?: DataTableColumnDirective) {
        if (!column || !column.sortable) {
            return;
        }

        this.sortDirection = (this.sortColumn !== column.name)
            ? 'asc'
            : (this.sortDirection === 'asc' ? 'desc' : 'asc')
        this.sortColumn = column.name
        this.items = _.orderBy(this.items, [this.sortColumn], [this.sortDirection])
    }

    selectCell(column: DataTableColumnDirective, item: any) {
        column.onSelect.emit(item)
    }
}
