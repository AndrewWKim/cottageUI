import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Idea } from 'app/models/idea';
import { IdeaStatus } from 'app/shared/enums/idea-status';
import { CustomValidators } from 'app/shared/validation/validators.module';

@Component({
    selector: 'app-idea-form',
    templateUrl: './idea-form.component.html',
    styleUrls: ['./idea-form.component.css'],
})
export class IdeaFormComponent implements OnInit {
    @Input() idea: Idea;
    @Output() onSubmit = new EventEmitter<any>();
    ideaStatuses = IdeaStatus;

    public readonly ADDITIONAL_INFO_FORM_KEY = 'additionalInfo';
    public readonly STATUS_FORM_KEY = 'status';

    form: FormGroup;
    submitted: boolean;

    public saveButtonDisabled = false;

    constructor(private fb: FormBuilder) {
        this.submitted = false;
        this.createForm();
    }

    ngOnInit() {
        this.submitCallbackFailed = this.submitCallbackFailed.bind(this);
        this.setFormData(this.idea);
    }

    submit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        const idea = { ...this.form.value };
        if (this.idea) {
            if (this.idea.status === IdeaStatus.Published) {
                idea.status = idea.status
                    ? IdeaStatus.Archived
                    : IdeaStatus.Published;
            } else if (this.idea.status === IdeaStatus.Moderating) {
                idea.status = idea.status
                    ? IdeaStatus.Published
                    : IdeaStatus.Moderating;
            } else if (this.idea.status === IdeaStatus.Archived) {
                idea.status = idea.status
                    ? IdeaStatus.Published
                    : IdeaStatus.Archived;
            }
        } else {
            idea.status = idea.status ? IdeaStatus.Published : IdeaStatus.Moderating;
        }

        this.saveButtonDisabled = true;
        this.onSubmit.emit({
            idea: idea,
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

    private setFormData(idea: Idea) {
        if (!idea) {
            return;
        }

        this.form.reset(
            {
                [this.ADDITIONAL_INFO_FORM_KEY]: idea.additionalInfo,
                [this.STATUS_FORM_KEY]: false,
            },
            { emitEvent: true }
        );
    }

    private createForm() {
        this.form = this.fb.group({
            [this.ADDITIONAL_INFO_FORM_KEY]: this.fb.control('', [
                CustomValidators.requiredNoWhitespace(),
            ]),
            [this.STATUS_FORM_KEY]: this.fb.control(false),
        });
    }
}
