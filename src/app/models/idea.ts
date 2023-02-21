import { JsonParser } from 'app/models/model-json-parser';
import { IdeaStatus } from 'app/shared/enums/idea-status';
import { DateUtils } from 'app/shared/utils/date-utils';

export class Idea implements JsonParser<Idea> {
    id: number;
    additionalInfo: string;
    publicationDate: Date;
    voteCount: number;
    votePercentInFavour: number;
    votePercentAgainst: number;
    votePercentAbstention: number;
    status: IdeaStatus;

    parseJson(json: any): Idea {
        if (json === null || json === undefined) {
            return null;
        }
        const idea: Idea = new Idea();

        idea.id = json.id;
        idea.additionalInfo = json.additionalInfo;
        idea.publicationDate = DateUtils.convertFromUTCToLocal(json.publicationDate);
        idea.voteCount = json.voteCount;
        idea.votePercentInFavour = json.votePercentInFavour;
        idea.votePercentAgainst = json.votePercentAgainst;
        idea.votePercentAbstention = json.votePercentAbstention;
        idea.status = json.status;

        return idea;
    }
}