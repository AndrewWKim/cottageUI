import { JsonParser } from 'app/models/model-json-parser';
import { DateUtils } from 'app/shared/utils/date-utils';
import { PassRequestType } from 'app/shared/enums/pass-request-type';

export class PassRequest implements JsonParser<PassRequest> {
    id: number;
    passRequestType: PassRequestType;
    carBrand: string;
    carModel: string;
    carLicensePlate: string;
    visitorName: string;
    visitDate: Date;
    visitTime: string;
    additionalInfo: string;
    clientName: string;
    cottageNumber: string;

    parseJson(json: any): PassRequest {
        if (json === null || json === undefined) {
            return null;
        }
        const passRequest: PassRequest = new PassRequest();

        passRequest.id = json.id;
        passRequest.passRequestType = json.passRequestType;
        passRequest.carBrand = json.carBrand;
        passRequest.visitDate = json.visitDate;
        passRequest.carModel = json.carModel;
        passRequest.carLicensePlate = json.carLicensePlate;
        passRequest.visitorName = json.visitorName;
        passRequest.visitTime = json.visitTime;
        passRequest.additionalInfo = json.additionalInfo;
        passRequest.clientName = json.clientName;
        passRequest.cottageNumber = json.cottageNumber;

        return passRequest;
    }
}