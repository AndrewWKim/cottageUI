import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdeaService } from 'app/shared/services/idea.service';
import { AuthenticationService } from 'app/core/authentication.service';
import { formatDate } from '@angular/common';
import { IdeaStatus } from 'app/shared/enums/idea-status';

@Component({
  selector: 'app-idea-create',
  templateUrl: './idea-create.component.html',
    styleUrls: ['./idea-create.component.css']
})
export class IdeaCreateComponent implements OnInit {
    ngOnInit() {}
    constructor(
      private ideaService: IdeaService,
      private router: Router,
      private auth: AuthenticationService) {
    }

    saveIdea(eventData) {
      eventData.idea.publicationDate = formatDate(new Date(), 'dd.MM.yyyy hh:mm:ss', 'ru');
      eventData.idea.userId = this.auth.session.user.id
      this.ideaService.createIdea(eventData.idea).subscribe(
        (data) => {
          this.router.navigate(['/ideas']);
        },
      (err) => {
            eventData.errorCallback(err);
        }
      );
  }
}
