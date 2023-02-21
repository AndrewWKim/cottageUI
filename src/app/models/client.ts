import { JsonParser } from 'app/models/model-json-parser';
import { DateUtils } from 'app/shared/utils/date-utils';
import { Car } from './car';
import { Cottage } from './cottage';
import { ClientTypes } from './client-types';
import { Card } from './card';
import { formatDate } from '@angular/common';

export class Client implements JsonParser<Client> {
    id: number;
    firstName: string;
    lastName: string;
    itn: string;
    phoneNumber: string;
    dateOfBirth?: Date;
    additionalInfo: string;
    passport: String;
    clientType: ClientTypes;
    residentTypeId: number;
    canVote: boolean;
    canPay: boolean;
    registrationCode: string;
    cottage: Cottage;
    cars: Car[];
    cards: Card[];
    photoUrl: string;
    loginName: string;
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    };

    parseJson(json: any): Client {
        if (json === null || json === undefined) {
            return null;
        }
        const client: Client = new Client();

        client.id = json.id;
        client.firstName = json.firstName;
        client.lastName = json.lastName;
        client.phoneNumber = json.phoneNumber;
        client.cottage = new Cottage().parseJson(json.cottage);
        client.additionalInfo = json.additionalInfo;
        client.dateOfBirth = json.dateOfBirth || null;
        client.passport = json.passport;
        client.clientType = json.clientType;
        client.residentTypeId = json.residentTypeId;
        client.registrationCode = json.registrationCode;
        client.cars = json.cars.map((new Car().parseJson));
        client.cards = json.cards.map((new Card().parseJson));
        client.canVote = json.canVote;
        client.canPay = json.canPay;
        client.photoUrl = json.photoUrl;
        client.itn = json.itn;
        client.loginName = json.loginName;

        return client;
    }
}
