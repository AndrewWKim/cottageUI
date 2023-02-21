import { Injectable } from '@angular/core';
import { ApplicationError } from './application-error';
import { BehaviorSubject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

type ErrorCallback = (error: ApplicationError) => void;

@Injectable()
export class ErrorNotificationService {
    public errorObservable: BehaviorSubject<ApplicationError> = new BehaviorSubject<ApplicationError>({ response: null, body: null });

    notifyError(error: ApplicationError) {
        this.errorObservable.next(error);
    }

    onError(callback: ErrorCallback) {
        this.errorObservable.pipe(throttleTime(1000)).subscribe(callback);
    }

    clear() {
        this.errorObservable = new BehaviorSubject<ApplicationError>({ response: null, body: null });
    }
}
