import { Pipe, PipeTransform } from '@angular/core'
import { DateUtils } from "app/shared/utils/date-utils"

@Pipe({
    name: 'formatMoment'
})
export class FormatMomentPipe implements PipeTransform {

    transform(date, format): any {
         return DateUtils.formatDuration(date, format)
    }
}
