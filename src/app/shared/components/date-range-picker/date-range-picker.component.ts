import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateUtils, DateFormat2MMDDYYYY } from '../../utils/date-utils';
import { DateFilterActive } from './date-filter-active';

@Component({
    selector: 'app-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
    @Output() change: EventEmitter<DateRangeValue> = new EventEmitter();

    @Input() dateFilter: DateFilterActive;
    @Input() start: Date;
    @Input() end: Date;

    DateFormat = DateFormat2MMDDYYYY;

    dateFilterActive = DateFilterActive;
    showScrollButtons = true;

    ngOnInit(): void {
        setTimeout(() => this.changeDateFilter(this.dateFilter));
    }

    changeDate(): void {
        this.changeDateFilter(DateFilterActive.Manually);
    }

    changeDateFilter(activeOption: DateFilterActive): void {
        this.dateFilter = activeOption;

        switch (activeOption) {
            case DateFilterActive.Day: {
                this.end = this.start;
                this.showScrollButtons = true;
                break;
            }
            case DateFilterActive.Week: {
                const weekRange = DateUtils.getWeekPeriod(this.start);
                this.start = weekRange.start;
                this.end = weekRange.end;
                this.showScrollButtons = true;
                break;
            }
            case DateFilterActive.Month: {
                const monthRange = DateUtils.getMonthPeriod(this.start);
                this.start = monthRange.start;
                this.end = monthRange.end;
                this.showScrollButtons = true;
                break;
            }
            case DateFilterActive.Manually: {
                this.showScrollButtons = false;
            }
        }

        this.emitChange();
    }

    rangePrevious(): void {
        this.changeDayRange(true);
        this.changeWeekRange(true);
        this.changeMonthRange(true);

        this.emitChange();
    }

    rangeToday(): void {
        this.start = new Date();
        this.end = this.start;
        this.dateFilter = DateFilterActive.Day;
        this.showScrollButtons = true;
        this.emitChange();
    }

    rangeNext(): void {
        this.changeDayRange(false);
        this.changeWeekRange(false);
        this.changeMonthRange(false);
        this.emitChange();
    }

    changeDayRange(isPrevious: boolean) {
        if (this.dateFilter === DateFilterActive.Day) {
            this.start = isPrevious
                ? DateUtils.addDays(this.start, -1)
                : DateUtils.addDays(this.start, 1);
                this.end = this.start;
        }
    }

    changeWeekRange(isPrevious: boolean) {
        if (this.dateFilter === DateFilterActive.Week) {
            const newDate = isPrevious
                ? DateUtils.addWeeks(this.start, -1)
                : DateUtils.addWeeks(this.start, 1);
            const weekRange = DateUtils.getWeekPeriod(newDate);

            this.start = weekRange.start;
            this.end = weekRange.end;
        }
    }

    changeMonthRange(isPrevious: boolean) {
        if (this.dateFilter === DateFilterActive.Month) {
            const newDate = isPrevious
                ? DateUtils.addMonths(this.start, -1)
                : DateUtils.addMonths(this.start, 1);
            const monthRange = DateUtils.getMonthPeriod(newDate);

            this.start = monthRange.start;
            this.end = monthRange.end;
        }
    }

    private emitChange(): void {
        this.change.emit(<DateRangeValue> {
            startDate: this.start,
            endDate: this.end,
            dateInterval: this.dateFilter
        });
    }
}

export interface DateRangeValue {
    startDate: Date;
    endDate: Date;
    dateInterval: DateFilterActive;
}
