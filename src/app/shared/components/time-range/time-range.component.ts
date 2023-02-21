import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { DateUtils } from 'app/shared/utils/date-utils';

export class TimeRange {
    startTime: string;
    endTime: string;

    public static initAllDay(): TimeRange {
        return new TimeRange(
            DateUtils.convertFromDateTo24TimeString(new Date(1, 1, 1, 0, 0, 0)),
            DateUtils.convertFromDateTo24TimeString(new Date(1, 1, 1, 23, 59, 59))
        );
    }

    constructor(startTime: string = null, endTime: string = null) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

@Component({
  selector: 'app-time-range',
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.css']
})

export class TimeRangeComponent {
    @ViewChild('startTimeComponent') startTimeComponent: TimePickerComponent;
    @ViewChild('endTimeComponent') endTimeComponent: TimePickerComponent;

    @Input() range: TimeRange;
    @Output() formatChange: EventEmitter<TimeRange> = new EventEmitter();
    @Output() timeChange: EventEmitter<TimeRange> = new EventEmitter();

    startTime: Date;
    endTime: Date;

    onStartTimeChange(newValue: Date): void {
        this.startTime = newValue;
        this.range.startTime = DateUtils.convertFromDateTo24TimeString(newValue);

        this.timeChange.emit(this.range);
    }

    onEndTimeChange(newValue: Date): void {
        this.endTime = newValue;
        this.range.endTime = DateUtils.convertFromDateTo24TimeString(newValue);

        this.timeChange.emit(this.range);
    }

    onStartFormatChange(newValue: Date): void {
        this.startTime = newValue;
        this.range.startTime = DateUtils.convertFromDateTo24TimeString(newValue);

        this.formatChange.emit(this.range);
    }

    onEndFormatChange(newValue: Date): void {
        this.endTime = newValue;
        this.range.endTime = DateUtils.convertFromDateTo24TimeString(newValue);

        this.formatChange.emit(this.range);
    }

    isValid(avoidEmit: boolean = false): boolean {
        if (!this.startTimeComponent.isValid(null, avoidEmit) || !this.endTimeComponent.isValid(null, avoidEmit)) {
            return false;
        }
        if (this.endTime <= this.startTime) {
            this.markFormAsInvalidTimeRange(this.endTimeComponent.timeForm);
            return false;
        } else {
            this.markFormAsValid(this.endTimeComponent.timeForm);
        }
        return true;
    }

    markFormAsInvalidTimeRange(form): void {
        this.setInvalidState(form, { invalidRange: true });
    }

    markFormAsValid(form): void {
        this.setInvalidState(form, null);
    }

    setInvalidState(form, error): void {
        if (error != null) {
            form.setErrors(error);
        } else {
            form.setErrors(null);
        }
    }

    disable(): void {
        this.startTimeComponent.disable();
        this.endTimeComponent.disable();
    }

    enable(): void {
        this.startTimeComponent.enable();
        this.endTimeComponent.enable();
    }
}
