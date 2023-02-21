export interface PagedResponse<T> {
    total: number;
    items: Array<T>;
}
