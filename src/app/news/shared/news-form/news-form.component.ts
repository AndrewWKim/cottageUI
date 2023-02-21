import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { News } from "app/models/news";
import { NewsStatus } from "app/shared/enums/news-status";
import { CustomValidators } from "app/shared/validation/validators.module";

@Component({
    selector: "app-news-form",
    templateUrl: "./news-form.component.html",
    styleUrls: ["./news-form.component.css"],
})
export class NewsFormComponent implements OnInit {
    @Input() news: News;
    @Output() onSubmit = new EventEmitter<any>();
    newsStatuses = NewsStatus;

    public readonly ADDITIONAL_INFO_FORM_KEY = "additionalInfo";
    public readonly STATUS_FORM_KEY = "status";

    form: FormGroup;
    submitted: boolean;

    public saveButtonDisabled = false;

    constructor(private fb: FormBuilder) {
        this.submitted = false;
        this.createForm();
    }

    ngOnInit() {
        this.submitCallbackFailed = this.submitCallbackFailed.bind(this);
        this.setFormData(this.news);
    }

    submit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        const news = { ...this.form.value };

        news.status = news.status ? NewsStatus.Archived : NewsStatus.Published;

        this.saveButtonDisabled = true;
        this.onSubmit.emit({
            news: news,
            errorCallback: this.submitCallbackFailed,
        });
    }

    submitCallbackFailed(err) {
        this.saveButtonDisabled = false;
        for (const fieldName in err.body) {
            if (err.body.hasOwnProperty(fieldName)) {
                if (this.form.controls[fieldName]) {
                    this.form.controls[fieldName].setErrors({
                        invalid: true,
                        error: err.body[fieldName],
                    });
                } else {
                    break;
                }
            }
        }
    }

    private setFormData(news: News) {
        if (!news) {
            return;
        }

        this.form.reset(
            {
                [this.ADDITIONAL_INFO_FORM_KEY]: news.additionalInfo,
                [this.STATUS_FORM_KEY]: false,
            },
            { emitEvent: true }
        );
    }

    private createForm() {
        this.form = this.fb.group({
            [this.ADDITIONAL_INFO_FORM_KEY]: this.fb.control("", [
                CustomValidators.requiredNoWhitespace(),
            ]),
            [this.STATUS_FORM_KEY]: this.fb.control(false),
        });
    }
}
