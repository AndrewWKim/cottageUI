import { JsonParser } from 'app/models/model-json-parser';

export class Cottage implements JsonParser<Cottage> {
    id: number;
    cottageNumber: string;
    area: number;
    mainSecurityContactId: number;

    parseJson(json: any): Cottage {
        if (json === null || json === undefined) {
            return null;
        }
        const cottage: Cottage = new Cottage();

        cottage.id = json.id;
        cottage.cottageNumber = json.cottageNumber;
        cottage.area = json.area;
        cottage.mainSecurityContactId = json.mainSecurityContactId;

        return cottage;
    }
}