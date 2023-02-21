import { Pipe, PipeTransform } from '@angular/core'
import { CurrencyPipe } from "@angular/common"

@Pipe({
    name: 'keys'
})
export class KeysPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return Object.keys(value)
    }
}
