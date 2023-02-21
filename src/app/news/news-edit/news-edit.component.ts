import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'app/models/news';
import { NewsService } from 'app/shared/services/news.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-news-edit',
    templateUrl: './news-edit.component.html',
    styleUrls: ['./news-edit.component.css'],
})
export class NewsEditComponent implements OnInit {
    news: News;

    constructor(
        private newsService: NewsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getNews().subscribe((news) => {
            this.news = news;
        });
    }

    private getNews(): Observable<News> {
        return this.route.data.pipe(map((data: { news: News }) => data.news));
    }

    editNews(eventData) {
        eventData.news.id = this.news.id;
        this.newsService.editNews(eventData.news).subscribe(
            (data) => {
                this.router.navigate(['/news']);
            },
            (err) => {
                eventData.errorCallback(err);
            }
        );
    }
}
