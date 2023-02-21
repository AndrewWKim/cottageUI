import { Component, Input } from '@angular/core';

@Component({
    selector: 'warning-label',
    templateUrl: './warning-label.component.html'
})
export class WarningLabelComponent {
    @Input() condition = false
}
