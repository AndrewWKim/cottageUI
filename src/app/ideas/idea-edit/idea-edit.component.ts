import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Idea } from 'app/models/idea';
import { IdeaService } from 'app/shared/services/idea.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-idea-edit',
  templateUrl: './idea-edit.component.html',
  styleUrls: ['./idea-edit.component.css']
})
export class IdeaEditComponent implements OnInit {

  idea: Idea;

  constructor(
    private ideaService: IdeaService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getIdea().subscribe(idea => {
      this.idea = idea
    })
  }

  private getIdea(): Observable<Idea> {
    return this.route.data
      .pipe(map((data: { idea: Idea }) => data.idea))
  }

  editIdea(eventData) {
    eventData.idea.id = this.idea.id;
    this.ideaService.editIdea(eventData.idea).subscribe(
      (data) => {
        this.router.navigate(['/ideas']);
      },
      (err) => {
        eventData.errorCallback(err);
      }
    );
  }
}
