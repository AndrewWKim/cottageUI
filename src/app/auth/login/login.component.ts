import { Component } from '@angular/core';
import { Credentials } from '../../models/credentials';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { CustomValidators } from 'app/shared/validation/validators.module';
import { AlertService, AlertConfig } from 'app/shared/services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public readonly USERNAME_FORM_KEY = 'username';
    public readonly PASSWORD_FORM_KEY = 'password';

    public isDataLoaded = true;
    public loginForm: FormGroup;

    constructor(
        private auth: AuthenticationService,
        private fb: FormBuilder,
        private router: Router,
        private alertService: AlertService) {
        this.createForm();
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.isDataLoaded = false;

        const credentials = Object.assign(new Credentials(), this.loginForm.value);
        this.auth.login(credentials).subscribe(
            data => {
                if (data.user.isAdmin || data.user.isSecurity) {
                    const route = data.user.isAdmin ? '/ideas' : '/cars'
                    this.router.navigate([route])
                        .then(r => this.isDataLoaded = true)
                        .catch(r => {
                            this.isDataLoaded = true;
                        });
                    return
                }

                this.alertService.showError('У этого аккаунта нет доступа', new AlertConfig(2000));
                this.isDataLoaded = true
            },
            (err) => {
                this.isDataLoaded = true;
                this.loginForm.controls[this.PASSWORD_FORM_KEY].setErrors(this.generateFormErrors(err));
                this.loginForm.controls[this.USERNAME_FORM_KEY].setErrors(this.generateFormErrors(err));
            });
    }

    private createForm(): void {
        this.loginForm = this.fb.group({
            [this.USERNAME_FORM_KEY]: this.fb.control('', CustomValidators.requiredNoWhitespace()),
            [this.PASSWORD_FORM_KEY]: this.fb.control('', CustomValidators.requiredNoWhitespace())
        });
    }

    private generateFormErrors(err) {
        return {
            invalid: true,
            error: !!err.errorDescription ?
                err.errorDescription :
                'Произошла ошибка. Пожалуйста обратитесь к системному администратору.'
        }
    }
}
