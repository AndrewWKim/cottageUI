import { JsonParser } from 'app/models/model-json-parser';
import { NewsStatus } from 'app/shared/enums/news-status';
import { DateUtils } from 'app/shared/utils/date-utils';

export class News implements JsonParser<News> {
    id: number;
    additionalInfo: string;
    publicationDate: Date;
    status: NewsStatus;

    parseJson(json: any): News {
        if (json === null || json === undefined) {
            return null;
        }
        const news: News = new News();

        news.id = json.id;
        news.additionalInfo = json.additionalInfo;
        news.publicationDate = DateUtils.convertFromUTCToLocal(
            json.publicationDate
        );
        news.status = json.status;

        return news;
    }
}
