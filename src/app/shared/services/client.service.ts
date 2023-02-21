import { Injectable } from '@angular/core'
import { HttpClientService } from 'app/core/http-client.service'
import { Client } from 'app/models/client'
import { Observable } from 'rxjs'
import { BaseService } from 'app/shared/services/base.service'
import { map } from 'rxjs/operators'
import { ClientTypes } from 'app/models/client-types'
import { Car } from 'app/models/car'

export interface PagedClientsResponse {
    total: number
    clients: Array<Client>
}

export interface CreateClientRequest {
    firstName: string
    lastName: string
    phoneNumber: string
    dateOfBirth?: string
    additionalInfo: string
    passport: String
    clientType: ClientTypes
    residentTypeId: number
    cottageId: number
    cars: Car[]
}

export interface EditClientRequest extends CreateClientRequest {
    id: number
}


@Injectable()
export class ClientService extends BaseService<Client> {

    constructor(httpClient: HttpClientService) {
        super(httpClient, new Client)
    }

    listAll(clientType: ClientTypes, offset?: number, limit?: number, exceptCurrent?: boolean): Observable<PagedClientsResponse> {
        return this.httpClient.get(`${this.baseUrl}/clients`, { params: { offset, limit, clientType, exceptCurrent } })
            .pipe(
                map(r => r.json()),
                map(json => <PagedClientsResponse>{
                    total: Number(json.total || 0),
                    clients: (json.clients || []).map(new Client().parseJson)
                })
            )
    }

    getClientById(id: string): Observable<Client> {
        return this.httpClient.get(`${this.baseUrl}/clients/${id}`).pipe(
            map(r => r.json()),
            map((new Client().parseJson)
            ))
    }

    createClient(model: CreateClientRequest): Observable<any> {
        return this.httpClient.post(
            `${this.baseUrl}/clients`, model)
    }

    updateClient(model: EditClientRequest): Observable<any> {
        return this.httpClient.put(
            `${this.baseUrl}/clients`, model)
    }

    deleteClient(id: number): Observable<any> {
        return this.httpClient.delete(
            `${this.baseUrl}/clients`, id)
    }
}
