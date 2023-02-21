import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

export const DateFormatMMDDYYYYHHmm = 'MM/DD/YYYY HH:mm';
export const DateFormatMMDDYYYY = 'MM-DD-YYYY';
export const DateFormat2MMDDYYYY = 'MM/DD/YYYY';
export const TimeFormat12HHmm = 'hh:mmA';
export const TimeFormat24HHmmss = 'HH:mm:ss';
export const DaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const WeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const Weekends = ['Saturday', 'Sunday'];
export const DateFormatWithDayOfWeek = 'EEEE, MMMM dd, yyyy';

export class DateRange {
    constructor(public start: Date, public end: Date) { }
}

export class DateUtils {
    static convertToAppDate(date: any): string {
        if (moment.isMoment(date)) {
            return moment(date).format(DateFormat2MMDDYYYY);
        }

        if (typeof date === 'string') {
            date = new Date(date);
        }

        return (date !== null && typeof date !== 'undefined')
            ? moment(date, DateFormatMMDDYYYYHHmm).format(DateFormat2MMDDYYYY)
            : null;
    }

    static beginOfDate(date: Date): Date {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }

    static endOfDate(date: Date): Date {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        return date;
    }

    static convertToUTCString(date: Date): string {
        return moment(date).utc().format(DateFormatMMDDYYYYHHmm);
    }

    static convertSecondsToMilliseconds(seconds: number): number {
        return seconds * 1000;
    }

    static convertDateFormat(date: any, fromFormat: string, toFormat: string): string {
        const dateMoment = this.parseDate(date, fromFormat);

        return this.formatDate(dateMoment, toFormat);
    }

    static convertToAppTime(time: any): string {
        if (moment.isDuration(time)) {
            return this.formatDuration(time, TimeFormat12HHmm);
        }

        return (time !== null && typeof time !== 'undefined')
            ? moment(time, TimeFormat24HHmmss).format(TimeFormat12HHmm)
            : null;
    }

    static convertFromDateTo24TimeString(time: any) {
        if (moment.isDuration(time)) {
            return this.formatDuration(time, TimeFormat24HHmmss);
        }

        return (time !== null && typeof time !== 'undefined')
            ? moment(time, TimeFormat24HHmmss).format(TimeFormat24HHmmss)
            : null;
    }

    static formatDate(date: moment.Moment, format: string): string {
        return (date !== null && typeof date !== 'undefined')
            ? date.format(format)
            : null;
    }

    static formatDuration(time: any, format: string): string {
        if (moment.isDuration(time)) {
            return moment(`${time.hours()}:${time.minutes()}`, 'H:m').format(format);
        }

        if (moment.isMoment(time)) {
            return time.format(format);
        }

        return time;
    }

    static convertFrom24TimeStringToDate(timeString: string): Date {
        return moment(timeString, 'HHmmss').toDate();
    }

    static parseDate(date: any, format: string): moment.Moment {
        if (moment.isMoment(date) || moment.isDate(date)) {
            return moment(date);
        }

        return (date != null && typeof date !== 'undefined')
            ? moment(date, format)
            : null;
    }

    static parseTime(time: any, timeFormat: string): moment.Moment {
        if (moment.isDate(time) || moment.isMoment(time)) {
            return moment(time).seconds(0);
        }

        return (time !== null && typeof time !== 'undefined')
            ? moment(time, timeFormat).seconds(0)
            : null;
    }

    static parseTimeDuration(time: any, timeFormat): moment.Duration {
        const timeMoment = this.parseTime(time, timeFormat);

        return (timeMoment !== null && typeof timeMoment !== 'undefined')
            ? moment.duration({ hours: timeMoment.hours(), minutes: timeMoment.minutes(), seconds: 0 })
            : null;
    }

    static convertToIsoDateTimeFormat(year: any, month: any, day: any, time: string): string {
        return year + '-' + DateUtils.toDateNumber(month) + '-' + DateUtils.toDateNumber(day) + 'T' + time;
    }

    static toDateNumber(num: number): string {
        return (num < 10) ? '0' + num : num.toString();
    }

    static convertTo24Hour(time: string): string {
        if (time.indexOf(':') === 1) {
            time = '0' + time;
        }
        const hours = parseInt(time.substr(0, 2));
        if (time.indexOf('AM') !== -1 && hours === 12) {
            time = time.replace('12', '00');
        }
        if (time.indexOf('PM') !== -1 && hours < 12) {
            time = time.replace(time.substr(0, 2), (hours + 12).toString());
        }
        return time.replace(/(AM|PM)/, '').trim();
    }

    static convertTo12Hour(time: string) {
        if (time.indexOf(':') === 1) {
            time = '0' + time;
        }
        let hours = parseInt(time.substr(0, 2));
        if (hours >= 12) {
            hours -= 12;
            time += ' PM';
        } else {
            time += ' AM';
        }
        return time.replace(time.substr(0, 2), this.toDateNumber(hours));
    }

    static ignoreUTC(date: Date | string): Date {
        const newDate = moment.utc(date).toDate();

        return new Date(newDate.valueOf() - newDate.getTimezoneOffset() * 60000);
    }

    static hoursMask(rawValue): RegExp[] {
        if (rawValue !== '') {
            if (rawValue[0] === '1') {
                return [/[0-1]/, /[0-2]/];
            }
            if (rawValue[0] === '2') {
                return [/[0-2]/, /[0-4]/];
            }
            if (rawValue[0] === '0') {
                return [/[0-1]/, /[0-9]/];
            }
        }

        return [/[0-2]/, /[0-4]/];
    }

    static minutesMask(rawValue): RegExp[] {
        if (rawValue !== '') {
            if (rawValue[0] >= 0 && rawValue[0] < 6) {
                return [/[0-5]/, /[0-9]/];
            } else if (rawValue[0] === 6) {
                return [/[0-6]/, /[0]/];
            }
        }

        return [/[0-6]/, /[0]/];
    }

    static createDateFromRUString(dateStr: string): Date {
        const a = dateStr.split(/[^0-9]/).map(item => parseInt(item, 10));
        return new Date(a[2] || 1, a[1] - 1 || 0, a[0], a[3] || 0, a[4] || 0, a[5] || 0);
    }

    static convertFromUTCToLocal(date: Date | string): any {
        if (isNullOrUndefined(date)) {
            return date;
        }

        const dateStr = date.toString();

        const dateData = dateStr.split(/[^0-9]/).map(item => parseInt(item, 10));

        if ((isNullOrUndefined(dateData[3]) || dateData[3] === 0)
            && (isNullOrUndefined(dateData[4]) || dateData[4] === 0)
            && (isNullOrUndefined(dateData[5]) || dateData[5] === 0)
            && (isNullOrUndefined(dateData[6]) || dateData[6] === 0)) {

            const newDate = moment.utc(date).local();

            return newDate.subtract('minutes', newDate.utcOffset()).toDate();
        }

        return moment.utc(date).toDate();
    }

    static convertToUTC(date: Date): Date {
        if (isNullOrUndefined(date)) {
            return date;
        }
        return moment.utc(date).toDate();
    }

    static addDays(date: Date, days: number): Date {
        return moment(date).add(days, 'days').toDate();
    }

    static addWeeks(date: Date, weeksNumber: number): Date {
        return moment(date).add(weeksNumber, 'weeks').toDate();
    }

    static addMonths(date: Date, monthsNumber: number): Date {
        return moment(date).add(monthsNumber, 'months').toDate();
    }

    static isBetweenDate(date: Date, start: Date, end: Date): boolean {
        date = DateUtils.toDate(date);
        start = DateUtils.toDate(start);
        end = DateUtils.toDate(end);

        return start <= date && date <= end;
    }

    static toDate(value: Date): Date {
        return moment(value).toDate();
    }

    static getWeekPeriod(date: Date): DateRange {
        const momentDate = moment(date);

        return new DateRange(momentDate.startOf('isoWeek').toDate(), momentDate.endOf('isoWeek').toDate());
    }

    static getMonthPeriod(date: Date): DateRange {
        const momentDate = moment(date);

        return new DateRange(momentDate.startOf('month').toDate(), momentDate.endOf('month').toDate());
    }

    static isSameDay(date1: Date, date2: Date): boolean {
        return moment(date1).isSame(date2, 'day');
    }

    static getHoursDiff(date1: Date, date2: Date): number {
        let hours = moment(date2).diff(moment(date1), 'hours');
        hours = Math.abs(hours);

        return hours;
    }

    static generateYears(): number[] {
        let years = [];
        const max = new Date().getFullYear() + 1;
        const min = max - 20;

        for (let i = max; i >= min; i--) {
            years.push(i);
        }

        return years;
    }
}
