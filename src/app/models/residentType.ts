import { JsonParser } from 'app/models/model-json-parser';

export class ResidentType implements JsonParser<ResidentType> {
    id: number;
    type: string;

    parseJson(json: any): ResidentType {
        if (json === null || json === undefined) {
            return null;
        }
        const residentType: ResidentType = new ResidentType();

        residentType.id = json.id;
        residentType.type = json.type;

        return residentType;
    }
}