import { JsonParser } from 'app/models/model-json-parser';

export class Settings implements JsonParser<Settings> {
    id: number;
    securityPhoneNumber: string;
    cottageRulesHTML: string;
    telegramChannelForSecurity: string;

    parseJson(json: any): Settings {
        if (json === null || json === undefined) {
            return null;
        }
        const settings: Settings = new Settings();

        settings.id = json.id;
        settings.securityPhoneNumber = json.securityPhoneNumber;
        settings.cottageRulesHTML = json.cottageRulesHTML;
        settings.telegramChannelForSecurity = json.telegramChannelForSecurity;

        return settings;
    }
}
