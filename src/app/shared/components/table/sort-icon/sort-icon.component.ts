import { Component, Input } from '@angular/core';

@Component({
    selector: 'sort-icon',
    templateUrl: './sort-icon.component.html'
})
export class SortIconComponent {
    @Input() column: string;
    @Input() sortColumn?: string;
    @Input() sortDirection?: string;
}
