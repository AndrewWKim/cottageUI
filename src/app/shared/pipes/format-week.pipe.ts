import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment';

@Pipe({
    name: 'formatWeek'
})
export class FormatWeekPipe implements PipeTransform {

    transform(date: any, args?: any): any {
        if (date === undefined || date == null) {
            return '';
        }

        if (moment.isDate(date)) {
            date = moment(date)
        }

        if (!moment.isMoment(date)) {
            throw new Error('Date should be JS Date or Moment type.')
        }

        const weekStart = date.startOf('isoWeek').format('MMMM DD, YYYY')
        const weekEnd = date.endOf('isoWeek').format('MMMM DD, YYYY')
        const week = date.format('[W]WW')

        return `${week} | ${weekStart} - ${weekEnd}`
    }
}
