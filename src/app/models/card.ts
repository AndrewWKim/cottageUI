import { JsonParser } from 'app/models/model-json-parser';
import { MatCardActions } from '@angular/material/card';

export class Card implements JsonParser<Card> {
    id: number;
    cardMask: string;

    parseJson(json: any): Card {
        if (json === null || json === undefined) {
            return null;
        }
        const car: Card = new Card();

        car.id = json.id;
        car.cardMask = json.cardMask;

        return car;
    }
}