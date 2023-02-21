import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-info-dialog',
    templateUrl: './info-dialog.component.html'
})
export class InfoDialogComponent {
    public message: string;

    constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) {
    }
}

export class  InfoDialogConfig {
  public static get() {
    return { disableClose: false, panelClass: 'confirm' };
  }
}
