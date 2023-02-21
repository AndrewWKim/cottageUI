import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunalBill } from 'app/models/communal-bill';
import { PaymentStatus } from 'app/shared/enums/payment-status';
import { PaymentType } from 'app/shared/enums/payment-type';
import { AlertConfig, AlertService } from 'app/shared/services/alert.service';
import { BillingService } from 'app/shared/services/billing.service';


@Component({
    selector: 'app-communal-bill-edit-dialog',
    templateUrl: './communal-bill-edit-dialog.html',
    styleUrls: ['./communal-bill-edit-dialog.css']
})

export class CommunalBillEditDialogComponent {

    communalBill: CommunalBill;
    title: string;
    paymentStatuses = [
        {
            id: PaymentStatus.Paid,
            name: 'Оплачено'
        },
        {
            id: PaymentStatus.Unpaid,
            name: 'Не оплачено'
        },
        {
            id: PaymentStatus.Partialy,
            name: 'Частично оплачено'
        }
    ];
    paymentStatusForm: FormGroup;

    constructor(
        private billingService: BillingService,
        private fb: FormBuilder,
        private alertService: AlertService,
        public dialogRef: MatDialogRef<CommunalBillEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CommunalBill) {
        this.paymentStatusForm = this.fb.group({
            paymentStatus: this.fb.control(data.paymentStatus, [Validators.required]),
            communalType: this.fb.control({ value: data.communalType, disabled: true }, [Validators.required]),
            cottageNumber: this.fb.control({ value: data.cottageNumber, disabled: true }, [Validators.required]),
            month: this.fb.control({ value: data.month, disabled: true }, [Validators.required]),
            price: this.fb.control({ value: data.price.toFixed(2) + ' грн', disabled: true }, [Validators.required]),
            year: this.fb.control({ value: data.year, disabled: true }, [Validators.required]),
        });
    }

    updatePaymentStatus(): void {
        this.billingService.updatePaymentStatus(PaymentType.CommunalBill, this.data.id, this.paymentStatusForm.controls.paymentStatus.value)
            .subscribe(() => {
                this.alertService.showSuccess('Счет обновлен.', new AlertConfig(2000));
                this.dialogRef.close();
            });
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
