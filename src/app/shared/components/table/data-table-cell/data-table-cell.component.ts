import { Component, OnInit, Input } from '@angular/core';
import { DataTableColumnDirective } from 'app/shared/components/table/data-table-column.directive';

@Component({
    selector: 'data-table-cell',
    templateUrl: './data-table-cell.component.html'
})
export class DataTableCellComponent {
    @Input() column: DataTableColumnDirective;
    @Input() item: any;
    @Input() index: number;

    constructor() { }

    get value(): any {
        return this.item[this.column.name]
    }
}
