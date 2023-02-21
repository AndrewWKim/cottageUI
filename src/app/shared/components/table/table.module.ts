import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from 'app/shared/components/table/data-table/data-table.component';
import { DataTableColumnDirective } from 'app/shared/components/table/data-table-column.directive';
import { DataTableCellComponent } from 'app/shared/components/table/data-table-cell/data-table-cell.component';
import { SortIconComponent } from 'app/shared/components/table/sort-icon/sort-icon.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DataTableComponent,
        DataTableCellComponent,
        DataTableColumnDirective,
        SortIconComponent
    ],
    exports: [
        DataTableComponent,
        DataTableColumnDirective
    ]
})
export class TableModule { }