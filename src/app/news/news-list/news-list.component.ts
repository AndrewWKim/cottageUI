import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { News } from 'app/models/news';
import { NewsService } from 'app/shared/services/news.service';
import { NewsStatus } from 'app/shared/enums/news-status';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { StorageUtils } from 'app/shared/utils/storage-utils';
import { DataSource } from '@angular/cdk/collections';

const NEWS_PAGINATION_KEY = 'COTTAGE_NEWS_PAGINATION';
const NEWS_STATUS_FILTER_KEY = 'COTTAGE_NEWS_STATUS_FILTER';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
    public displayedColumns;
    public dataSource: NewsDataSource | null;
    public news: News[] = [];
    public news$: Observable<News[]>;
    public filters: FormGroup;
    newsStatuses = NewsStatus;
    public statuses = [
        {
            id: NewsStatus.Published,
            title: 'Опубликованные',
        },
        {
            id: NewsStatus.Archived,
            title: 'Архивированные',
        },
    ];

    public paging = {
        total: 0,
        pageIndex: 0,
        limit: 10,
    };

    public reloadData = _.debounce(this._reloadData, 0);

    constructor(
        private newsService: NewsService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.filters = this.fb.group({
            status: new FormControl(this.getInitFilter()),
        });
        this.filters.controls.status.valueChanges.subscribe((value) => {
            StorageUtils.setItem(NEWS_STATUS_FILTER_KEY, value);
            this.reloadData();
        });
        const storagePagination = StorageUtils.getItem(
            NEWS_PAGINATION_KEY
        );
        this.paging = storagePagination || this.paging;
    }

    ngOnInit() {
        this.reloadData();
        this.displayedColumns = [
            'additionalInfo',
            'publicationDate',
            'status',
            'action',
        ];
    }

    getInitFilter(): any[] {
        let filter = [NewsStatus.Published, NewsStatus.Archived];
        const storageFilter = StorageUtils.getItem(NEWS_STATUS_FILTER_KEY);

        if (storageFilter) {
            filter = storageFilter;
        } else {
            StorageUtils.setItem(NEWS_STATUS_FILTER_KEY, filter);
        }

        return filter;
    }

    _reloadData() {
        const filters = this.filters.getRawValue();
        const statuses = filters.status || null;
        this.newsService.listAll(
            this.paging.pageIndex,
            this.paging.limit,
            statuses
        ).subscribe(newsData => {
            this.paging.total = newsData.total;
            this.dataSource = new NewsDataSource(newsData.news);
        });
    }

    edit(id: number) {
        this.router.navigate(['news', id]);
    }

    pageChanged(pageInfo) {
        this.paging.pageIndex = pageInfo.pageIndex;
        this.paging.limit = pageInfo.pageSize;
        StorageUtils.setItem(NEWS_PAGINATION_KEY, this.paging);
        this.reloadData();
    }
}

export class NewsDataSource extends DataSource<any> {
    constructor(private news: News[]) {
        super();
    }
    connect(): Observable<News[]> {
        return of(this.news);
    }
    disconnect() {}
}
