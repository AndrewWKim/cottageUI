import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'price'
})
export class PricePipe extends CurrencyPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const formattedPrice = super.transform(value, 'USD', 'symbol', '1.2-2')
        return formattedPrice
    }
}
