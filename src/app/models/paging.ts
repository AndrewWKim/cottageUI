export class Paging {
    constructor(
        public total: number = 0,
        public pageIndex: number = 0,
        public limit: number = 100
    ) {}
}
