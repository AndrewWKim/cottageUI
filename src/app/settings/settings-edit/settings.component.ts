import { Settings } from './../../models/settings';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorPatterns } from './../../shared/validation/validator-patterns';
import { SettingsService } from './../../shared/services/settings.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomValidators } from 'app/shared/validation/validators.module';

@Component({
    selector: 'app-settings-edit',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsEditComponent implements OnInit {
    public readonly PHONE_NUMBER_FORM_KEY = 'phoneNumber';
    public readonly TELEGRAM_CHANNEL_FOR_SECURITY_FORM_KEY = 'telegramChannelForSecurity';
    public readonly COTTAGE_RULES_HTML_FORM_KEY = 'cottageRulesHTML';

    phoneMask = ValidatorPatterns.phoneMask;
    form: FormGroup;
    settings: Settings;
    textareaHeight = '300px';

    constructor(
        private settingsService: SettingsService,
        private fb: FormBuilder
    ) {
        this.createForm();
        this.resetData();
        this.form.disable();
    }

    @ViewChild('rulesTextArea', { read: ElementRef, static: true }) rulesTextArea: ElementRef;

    private resetData() {
        this.settingsService.getSettings().subscribe(settings => {
            this.settings = settings;
            this.setFormData(settings);
            this.textareaHeight = 20 + this.rulesTextArea.nativeElement.scrollHeight + 'px'
        });
    }

    public enableEditing() {
        this.form.enable();
    }

    public cancel() {
        this.resetData();
        this.form.disable();
    }

    public saveSettings() {
        this.settings.securityPhoneNumber = this.form.value[
            this.PHONE_NUMBER_FORM_KEY
        ].replace(/\D/g, '');
        this.settings.cottageRulesHTML = this.form.value[
            this.COTTAGE_RULES_HTML_FORM_KEY
        ];
        this.settings.telegramChannelForSecurity = this.form.value[
            this.TELEGRAM_CHANNEL_FOR_SECURITY_FORM_KEY
        ]
        this.settingsService
            .editSettings(this.settings)
            .subscribe(result => this.form.disable());
    }

    ngOnInit(): void {}

    private createForm() {
        this.form = this.fb.group({
            [this.PHONE_NUMBER_FORM_KEY]: this.fb.control('', [
                Validators.required,
                CustomValidators.withMaskNoUnderscore(),
            ]),
            [this.COTTAGE_RULES_HTML_FORM_KEY]: this.fb.control('', [
                Validators.required
            ]),
            [this.TELEGRAM_CHANNEL_FOR_SECURITY_FORM_KEY]: this.fb.control('', [
                Validators.required
            ])
        });
    }

    private setFormData(settings: Settings) {
        this.form.reset(
            {
                [this.PHONE_NUMBER_FORM_KEY]: settings.securityPhoneNumber,
                [this.COTTAGE_RULES_HTML_FORM_KEY]: settings.cottageRulesHTML,
                [this.TELEGRAM_CHANNEL_FOR_SECURITY_FORM_KEY]: settings.telegramChannelForSecurity
            },
            { emitEvent: true }
        );
    }
}
