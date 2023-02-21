import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

export class AlertConfig {
    public static defaultDuration = 5000;

    constructor(public duration: number = AlertConfig.defaultDuration){
    }
}

@Injectable()
export class AlertService {
    constructor(private snackBar: MatSnackBar) {
    }

    showSuccess(message: string, config: AlertConfig = new AlertConfig()): void {
        const snackBarConfig = this.getSnackBarConfig(config, ['success-snackbar']);

        this.snackBar.open(`Успешно: ${message}`, undefined, snackBarConfig);
    }

    showError(message: string, config: AlertConfig = new AlertConfig()): MatSnackBarRef<SimpleSnackBar> {
        const snackBarConfig = this.getSnackBarConfig(config, ['error-snackbar']);

        return this.snackBar.open(`Ошибка: ${message}`, undefined, snackBarConfig);
    }

    private getSnackBarConfig(alertConfig: AlertConfig, classes: string[]): MatSnackBarConfig {
        const snackBarConfig = new MatSnackBarConfig();
        snackBarConfig.duration = alertConfig.duration;
        snackBarConfig.horizontalPosition = 'center';
        snackBarConfig.verticalPosition = 'top';
        snackBarConfig.panelClass = classes;

        return snackBarConfig;
    }
}
