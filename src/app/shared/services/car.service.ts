import { Injectable } from '@angular/core';
import { HttpClientService } from 'app/core/http-client.service';
import { Observable } from 'rxjs';
import { BaseService } from 'app/shared/services/base.service';
import { map } from 'rxjs/operators';
import { Car } from 'app/models/car';

export interface PagedCarsResponse {
    total: number;
    cars: Array<Car>;
}

@Injectable()
export class CarService extends BaseService<Car>  {

    constructor(httpClient: HttpClientService) {
        super(httpClient, new Car());
    }

    listAll(offset?: number, limit?: number, carLicensePlate? : string): Observable<PagedCarsResponse> {
        return this.httpClient.get(`${this.baseUrl}/clients/cars`, { params: { offset, limit, carLicensePlate } })
            .pipe(
                map(r => r.json()),
                map(json => <PagedCarsResponse>{
                    total: Number(json.total || 0),
                    cars: (json.cars || []).map(new Car().parseJson)
                })
            );
    }
}
