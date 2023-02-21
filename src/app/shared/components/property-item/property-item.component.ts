import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css']
})
export class PropertyItemComponent {
  @Input() leftStr: string;
  @Input() rightStr: string;

  constructor() { }
}
