import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Cottage } from 'app/models/cottage';
import { ValidatorPatterns } from '../../../shared/validation/validator-patterns';
import { Observable, zip } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CommonService } from 'app/shared/services/common.service';

@Component({
    selector: 'app-cottage-form',
    templateUrl: './cottage-form.component.html',
    styleUrls: ['./cottage-form.component.css']
})

export class CottageFormComponent implements OnInit {
    @Output() onSubmit = new EventEmitter<any>();

    public readonly COTTAGE_NUMBER_FORM_KEY = 'cottageNumber';
    public readonly AREA_FORM_KEY = 'area';

    phoneMask = ValidatorPatterns.phoneMask;

    form: FormGroup;
    submitted: boolean;
    cottage: Cottage;
    maxArea: number;

    public saveButtonDisabled = false;

    get meterDeclension(): string {
        const areaInteger = Math.trunc(this.form.controls[this.AREA_FORM_KEY].value);
        const areaString = areaInteger.toString();
        if (areaInteger % 10 === 1 || areaInteger === 1) {
            return 'сотка'
        } else if (areaString.endsWith('2') || areaString.endsWith('3') || areaString.endsWith('4')) {
            return 'сотки'
        }
        return 'соток'
    }

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private commonService: CommonService) {
        this.submitted = false;
        this.createForm();
    }

    ngOnInit() {
        const requests = zip(
            this.getCottage(),
            this.commonService.getLeftCottagesArea(),
        );

        requests.subscribe(
            ([cottage, maxArea]) => {
                this.cottage = cottage;
                this.setFormData(cottage);
                this.maxArea = cottage ? maxArea + cottage.area : maxArea;
                this.form.controls[this.AREA_FORM_KEY].setValidators([Validators.required, Validators.max(this.maxArea)])
            }
        );

        this.submitCallbackFailed = this.submitCallbackFailed.bind(this);
    }

    private setFormData(cottage: Cottage) {
        if (!cottage) {
            return;
        }
        this.form.reset({
            [this.COTTAGE_NUMBER_FORM_KEY]: cottage.cottageNumber,
            [this.AREA_FORM_KEY]: cottage.area,
        }, { emitEvent: false });
    }

    submit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        let cottage = { ...this.form.value };
        cottage.id = this.cottage?.id;

        this.saveButtonDisabled = true;
        this.onSubmit.emit({ cottage: cottage, errorCallback: this.submitCallbackFailed });
    }

    submitCallbackFailed(err) {
        this.saveButtonDisabled = false;
        for (const fieldName in err.body) {
            if (err.body.hasOwnProperty(fieldName)) {
                if (this.form.controls[fieldName]) {
                    this.form.controls[fieldName].setErrors({ invalid: true, error: err.body[fieldName] });
                } else {
                    break;
                }
            }
        }
    }

    private createForm() {
        this.form = this.fb.group({
            [this.COTTAGE_NUMBER_FORM_KEY]: this.fb.control('', [Validators.required, Validators.maxLength(9)]),
            [this.AREA_FORM_KEY]: this.fb.control(''),
        });
    }

    private getCottage(): Observable<Cottage> {
        return this.route.data
            .pipe(map((data: { cottage: Cottage }) => data.cottage))
    }
}
