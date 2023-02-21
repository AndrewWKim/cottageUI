import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Cottage } from 'app/models/cottage';
import { forkJoin, Subscription, fromEvent } from 'rxjs';
import { ValidatorPatterns } from '../../../shared/validation/validator-patterns';
import { ErrorNotificationService } from '../../../core/error-notification.service';
import { CustomValidators } from 'app/shared/validation/validators.module';
import { Client } from 'app/models/client';
import { CottageService } from 'app/shared/services/cottage.service';
import { Car } from 'app/models/car';
import { ClientTypes } from 'app/models/client-types';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { ResidentType } from 'app/models/residentType';
import { CommonService } from 'app/shared/services/common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-resident-form',
    templateUrl: './resident-form.component.html',
    styleUrls: ['./resident-form.component.css']
})

export class ResidentFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() resident: Client;
    @Input() formType: number;
    @Output() onSubmit = new EventEmitter<any>();

    public readonly FIRST_NAME_FORM_KEY = 'firstName';
    public readonly LAST_NAME_FORM_KEY = 'lastName';
    public readonly ITN_FORM_KEY = 'itn';
    public readonly PHONE_NUMBER_FORM_KEY = 'phoneNumber';
    public readonly DATE_OF_BIRTH_FORM_KEY = 'dateOfBirth';
    public readonly PASSPORT_FORM_KEY = 'passport';
    public readonly COTTAGE_ID_FORM_KEY = 'cottageId';
    public readonly ADDITIONAL_INFO_FORM_KEY = 'additionalInfo';
    public readonly RESIDENT_TYPE_ID_FORM_KEY = 'residentTypeId';
    public readonly GIVE_ACCESS_TO_MOBILE = 'mobileAccess';
    public readonly CLIENT_TYPE_FORM_KEY = 'clientType';
    public readonly CAN_PAY_FORM_KEY = 'canPay';
    public readonly CAN_VOTE_FORM_KEY = 'canVote';

    phoneMask = ValidatorPatterns.phoneMask;

    form: FormGroup;
    submitted: boolean;

    cottages: Cottage[] = [];
    residentTypes: ResidentType[] = [];

    clientTypes = [
        {
            id: 1,
            type: 'Владелец'
        },
        {
            id: 2,
            type: 'Жилец'
        }
    ]

    public saveButtonDisabled = false

    cars: Car[] = []
    todayDate: Date
    isCreateForm = false

    @ViewChild('datePicker', { read: ElementRef, static: true }) _datePicker: ElementRef
    @ViewChild('datePicker', { read: MatDatepickerInput, static: true }) _datepickerInput: MatDatepickerInput<any>

    private _eventSubscription: Subscription

    ngAfterViewInit(): void {
        this._eventSubscription = fromEvent(this._datePicker.nativeElement, 'input')
            .subscribe(_ => {
                this._datepickerInput._onInput(this._datePicker.nativeElement.value);
            })
    }

    ngOnDestroy(): void {
        this._eventSubscription.unsubscribe()
    }

    constructor(
        private fb: FormBuilder,
        private errorService: ErrorNotificationService,
        private cottageService: CottageService,
        private commonService: CommonService,
        private router: Router) {
        this.submitted = false
        this.createForm()
        this.isCreateForm = router.url.endsWith('/create')
    }

    ngOnInit() {
        this.submitCallbackFailed = this.submitCallbackFailed.bind(this);

        forkJoin(
            this.commonService.getResidentTypes(),
            this.cottageService.listAll()
        ).subscribe(([residentTypes, cottagesData]) => {
            this.cottages = cottagesData.cottages;
            this.residentTypes = residentTypes;
            this.setFormData(this.resident);
        });
        this.todayDate = new Date();
        this.form.controls[this.CLIENT_TYPE_FORM_KEY].valueChanges.subscribe(value => {
            if (value === ClientTypes.Owner) {
                this.cottageService.listAll(null, null, true).subscribe(cottagesData => {
                    this.cottages = cottagesData.cottages;
                })
                this.form.removeControl(this.GIVE_ACCESS_TO_MOBILE);
                this.form.removeControl(this.RESIDENT_TYPE_ID_FORM_KEY);

                this.form.addControl(this.ITN_FORM_KEY, this.fb.control('', [CustomValidators.requiredNoWhitespace()]))
                return
            }

            this.cottageService.listAll().subscribe(cottagesData => {
                this.cottages = cottagesData.cottages;
            })

            this.form.removeControl(this.ITN_FORM_KEY);
            this.form.addControl(this.GIVE_ACCESS_TO_MOBILE, this.fb.control(false))
            this.form.addControl(this.RESIDENT_TYPE_ID_FORM_KEY, this.fb.control('', [Validators.required]))
        })
    }

    private setFormData(resident: Client) {

        if (!resident) {
            return;
        }

        this.form.reset({
            [this.FIRST_NAME_FORM_KEY]: resident.firstName,
            [this.LAST_NAME_FORM_KEY]: resident.lastName,
            [this.ITN_FORM_KEY]: resident.itn,
            [this.PHONE_NUMBER_FORM_KEY]: resident.phoneNumber,
            [this.DATE_OF_BIRTH_FORM_KEY]: resident.dateOfBirth || '',
            [this.PASSPORT_FORM_KEY]: resident.passport,
            [this.COTTAGE_ID_FORM_KEY]: resident.cottage.id,
            [this.ADDITIONAL_INFO_FORM_KEY]: resident.additionalInfo,
            [this.RESIDENT_TYPE_ID_FORM_KEY]: resident.residentTypeId,
            [this.CLIENT_TYPE_FORM_KEY]: resident.clientType === ClientTypes.MainResident ? 2 : resident.clientType,
            [this.GIVE_ACCESS_TO_MOBILE]: resident.clientType !== ClientTypes.Resident,
            [this.CAN_PAY_FORM_KEY]: resident.canPay,
            [this.CAN_VOTE_FORM_KEY]: resident.canVote,
        }, { emitEvent: true });

        this.cars = resident.cars;
    }

    addCar(eventData) {
        this.cars.push(eventData.car);
    }

    removeCar(eventData) {
        this.cars.splice(this.cars.indexOf(eventData.car), 1);
    }

    submit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        const resident = this.createResidentsJson();

        if (resident.clientType === ClientTypes.Resident || resident.clientType === ClientTypes.MainResident) {
            resident.clientType = this.form.controls[this.GIVE_ACCESS_TO_MOBILE]?.value === true ? ClientTypes.MainResident : ClientTypes.Resident
        }

        if (resident.clientType === ClientTypes.Resident) {
            resident.canPay = false;
            resident.canPay = true;
        }

        this.saveButtonDisabled = true;
        this.onSubmit.emit({ resident: resident, errorCallback: this.submitCallbackFailed });
    }

    submitCallbackFailed(err) {
        this.saveButtonDisabled = false;
        for (const fieldName in err.body) {
            if (err.body.hasOwnProperty(fieldName)) {
                if (this.form.controls[fieldName]) {
                    this.form.controls[fieldName].setErrors({ invalid: true, error: err.body[fieldName] });
                } else {
                    this.errorService.notifyError(err);
                    break;
                }
            }
        }
    }

    private createForm() {
        this.form = this.fb.group({
            [this.FIRST_NAME_FORM_KEY]: this.fb.control('', [CustomValidators.requiredNoWhitespace()]),
            [this.LAST_NAME_FORM_KEY]: this.fb.control('', [CustomValidators.requiredNoWhitespace()]),
            [this.ITN_FORM_KEY]: this.fb.control('', [CustomValidators.requiredNoWhitespace()]),
            [this.PHONE_NUMBER_FORM_KEY]: this.fb.control('', [Validators.required, CustomValidators.withMaskNoUnderscore()]),
            [this.DATE_OF_BIRTH_FORM_KEY]: this.fb.control(''),
            [this.COTTAGE_ID_FORM_KEY]: this.fb.control('', [Validators.required]),
            [this.PASSPORT_FORM_KEY]: this.fb.control('', [CustomValidators.withMaskNoUnderscore()]),
            [this.ADDITIONAL_INFO_FORM_KEY]: this.fb.control(''),
            [this.RESIDENT_TYPE_ID_FORM_KEY]: this.fb.control('', [Validators.required]),
            [this.GIVE_ACCESS_TO_MOBILE]: this.fb.control(false),
            [this.CLIENT_TYPE_FORM_KEY]: this.fb.control('', [Validators.required]),
            [this.CAN_PAY_FORM_KEY]: this.fb.control(false),
            [this.CAN_VOTE_FORM_KEY]: this.fb.control(false),
        });
    }

    private createResidentsJson() {
        let resident: Client = {
            ...this.form.value,
            cars: this.cars
        }

        return resident;
    }
}
