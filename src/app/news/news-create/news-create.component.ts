import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'app/shared/services/news.service';
import { AuthenticationService } from 'app/core/authentication.service';
import { formatDate } from '@angular/common';
import { NewsStatus } from 'app/shared/enums/news-status';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
    styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
    ngOnInit() {}
    constructor(
      private newsService: NewsService,
      private router: Router,
      private auth: AuthenticationService) {
    }

    saveNews(eventData) {
      eventData.news.publicationDate = formatDate(new Date(), 'dd.MM.yyyy hh:mm:ss', 'ru');
      eventData.news.userId = this.auth.session.user.id
      this.newsService.createNews(eventData.news).subscribe(
        (data) => {
          this.router.navigate(['/news']);
        },
      (err) => {
            eventData.errorCallback(err);
        }
      );
  }
}
