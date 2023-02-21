import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { TimePickerComponent } from 'app/shared/components/time-picker/time-picker.component';
import { DateUtils } from 'app/shared/utils/date-utils';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-device-battery-replacement-dialog',
  templateUrl: './device-battery-replacement-dialog.component.html',
  styleUrls: ['./device-battery-replacement-dialog.component.css']
})
export class DeviceBatteryReplacementDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  batteryReplacementForm: FormGroup;
  defaultDateTime: Date = new Date();

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DeviceBatteryReplacementDialogComponent>) {
    this.createForm();
  }

  @ViewChild('dateTimePicker', { read: ElementRef, static: true }) _dateTimePicker: ElementRef;
  @ViewChild('dateTimePicker', { read: MatDatepickerInput, static: true }) _dateTimePickerInput: MatDatepickerInput<any>;
  private _dateEventSubscription: Subscription;

  ngAfterViewInit(): void {
    this._dateEventSubscription = fromEvent(this._dateTimePicker.nativeElement, 'input')
      .subscribe(_ => {
        this._dateTimePickerInput._onInput(this._dateTimePicker.nativeElement.value);
      });
  }

  ngOnDestroy() {
    this._dateEventSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close({ dateTime: new Date(DateUtils.ignoreUTC(this.batteryReplacementForm.controls['dateTime'].value)) });
  }

  private createForm() {
    this.batteryReplacementForm = this.fb.group({
      dateTime: this.fb.control(this.defaultDateTime, Validators.required)
    });
  }

}
