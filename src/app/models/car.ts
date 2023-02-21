import { JsonParser } from 'app/models/model-json-parser';

export class Car implements JsonParser<Car> {
    id: number;
    brand: string;
    model: string;
    carLicensePlate: string;
    clientFullName: string;

    parseJson(json: any): Car {
        if (json === null || json === undefined) {
            return null;
        }
        const car: Car = new Car();

        car.id = json.id;
        car.brand = json.brand;
        car.model = json.model;
        car.carLicensePlate = json.carLicensePlate;
        car.clientFullName = json.clientFullName;

        return car;
    }
}