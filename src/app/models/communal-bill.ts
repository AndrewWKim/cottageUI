import { JsonParser } from 'app/models/model-json-parser';
import { PaymentStatus } from 'app/shared/enums/payment-status';

export class CommunalBill implements JsonParser<CommunalBill> {
    id: number;
    communalType: string;
    cottageNumber: string;
    price: number;
    month: number;
    year: number;
    paymentStatus: PaymentStatus;
    cottageOwner: string;

    parseJson(json: any): CommunalBill {
        if (json === null || json === undefined) {
            return null;
        }
        const communalBill: CommunalBill = new CommunalBill();

        communalBill.id = json.id;
        communalBill.communalType = json.communalType;
        communalBill.cottageNumber = json.cottageNumber;
        communalBill.price = json.price;
        communalBill.month = json.month;
        communalBill.year = json.year;
        communalBill.paymentStatus = json.paymentStatus;
        communalBill.cottageOwner = json.cottageOwner || null;

        return communalBill;
    }
}