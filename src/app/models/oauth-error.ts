export class OAuthError {
    constructor(
        public error: string,
        public errorDescription: string) {
    }

    toString() {
        return this.errorDescription
    }
}