import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
    MatDialogConfig,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
    confirmButtonText: string;
    cancelButtonText: string;
    message: string;
}
@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
    public confirmButtonText: string;
    public cancelButtonText: string;
    public message: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.cancelButtonText = data.cancelButtonText || 'Отмена';
        this.confirmButtonText = data.confirmButtonText || 'Подтвердить';
        this.message = data.message;
    }
}

export class ConfirmationDialogConfig {
    public static get(): MatDialogConfig {
        const config = new MatDialogConfig();
        config.disableClose = false;
        config.panelClass = 'confirm';
        return config;
    }
}
