export interface JsonParser<T> {
    parseJson(json: any): T;
}
