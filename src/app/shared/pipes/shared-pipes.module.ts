import { NgModule } from '@angular/core'
import { FormatMomentPipe } from 'app/shared/pipes/format-moment.pipe'
import { FormatWeekPipe } from 'app/shared/pipes/format-week.pipe'
import { PricePipe } from 'app/shared/pipes/price.pipe'
import { KeysPipe } from 'app/shared/pipes/keys.pipe'

@NgModule({
    declarations: [
        FormatMomentPipe,
        FormatWeekPipe,
        PricePipe,
        KeysPipe
    ],
    exports: [
        FormatMomentPipe,
        FormatWeekPipe,
        PricePipe,
        KeysPipe
    ]
})
export class SharedPipesModule { }