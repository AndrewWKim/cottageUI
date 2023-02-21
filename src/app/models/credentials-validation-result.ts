import { User } from './user';

export class CredentialsValidationResult {
    user?: User;
    isValid: boolean;
    error: string;

    static parseJson(json: any): CredentialsValidationResult {
        if (json === null || typeof json === 'undefined') {
          return null;
        }

        const model = new CredentialsValidationResult();
        model.isValid = json.valid || false;
        model.error = json.error;
        model.user = json.user;

        return model;
    }
}
