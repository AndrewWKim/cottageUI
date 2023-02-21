import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateUtils } from 'app/shared/utils/date-utils';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.css']
})

export class TimePickerComponent implements OnInit {
    timeForm: FormGroup;

    @Input() time: string;
    @Input() placeholder: string;
    @Output() onTimeChange = new EventEmitter<any>();
    @Output() onTimeFormatChange = new EventEmitter<any>();

    minStartDate = new Date();
    timeControlsId = ['time', 'timeFormat'];
    currTime: Date;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit(): void {
        this.currTime = DateUtils.convertFrom24TimeStringToDate(this.time);

        if (!this.placeholder) {
            this.placeholder = 'Time';
        }

        if (this.currTime) {
            this.setForm();
        }
    }

    createForm(): void {
        this.timeForm = this.fb.group({
            time: this.fb.control('', Validators.required),
            timeFormat: this.fb.control('', Validators.required)
        });

        this.timeForm.controls['timeFormat'].valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((value: string) => this.isValid(value, null, null));

        this.timeForm.controls['time'].valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((value: string) => this.isValid(null, null, value));
    }

    setForm(): void {
        const time = DateUtils.convertToAppTime(new Date(this.currTime));

        this.timeForm.reset({
            time: this.getTime(time),
            timeFormat: this.getFormat(time)
        })
    }

    isValid(timeFormat: string = null, avoidEmit: boolean = false, time: string = null): boolean {
        const filterData = this.timeForm.value;
        const convertedTime = DateUtils.convertTo24Hour((time || filterData.time) + (timeFormat || filterData.timeFormat) + ':00');
        const dateTime = DateUtils.convertFrom24TimeStringToDate(convertedTime);

        if (filterData.time.length && !isNullOrUndefined(dateTime)) {
            if (!avoidEmit) {
                if (timeFormat) {
                    this.onTimeFormatChange.emit(dateTime);
                } else {
                    this.onTimeChange.emit(dateTime);
                }
            }
            this.markFormAsValid(this.timeControlsId);
        } else {
            this.markFormAsInvalidTime(this.timeControlsId);
            return false;
        }

        return true;
    }

    markFormAsInvalidTime(filterFormControls): void {
        this.setInvalidState(this.timeForm, filterFormControls, { InvalidTime: true });
    }

    markFormAsInvalid(error): void {
        this.setInvalidState(this.timeForm, this.timeControlsId, error);
    }

    markFormAsValid(filterFormControls): void {
        this.setInvalidState(this.timeForm, filterFormControls, null);
    }

    setInvalidState(form, controls, error): void {
        if (error != null) {
            for (let i = 0; i < controls.length; i++) {
                form.controls[controls[i]].setErrors(error);
                form.controls[controls[i]].markAsTouched();
            }
        } else {
            for (let i = 0; i < controls.length; i++) {
                form.controls[controls[i]].setErrors(null);
                form.controls[controls[i]].markAsTouched();
            }
        }
    }

    timeMask = function (rawValue): (string | RegExp)[] {
        if (rawValue !== '' && rawValue[0] === '1') {
          return [/[0-1]/, /[0-2]/, ':', /[0-5]/, /[0-9]/];
        }
        if (rawValue !== '' && rawValue[0] === '0') {
          return [/[0-1]/, /[1-9]/, ':', /[0-5]/, /[0-9]/];
        }

        return [/[0-1]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
    }

    disable(): void {
        this.timeForm.disable();
    }

    enable(): void {
        this.timeForm.enable();
    }

    private getFormat(time: any): 'AM' | 'PM' {
        return time.indexOf('AM') > -1 ? 'AM' : 'PM'
    }

    private getTime(time: any): any {
        return time.replace('AM', '').replace('PM', '');
    }
}
