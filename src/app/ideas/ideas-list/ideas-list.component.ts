import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Idea } from 'app/models/idea';
import { IdeaService } from 'app/shared/services/idea.service';
import { IdeaStatus } from 'app/shared/enums/idea-status';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { StorageUtils } from 'app/shared/utils/storage-utils';

const IDEA_STATUS_FILTER_KEY = 'COTTAGE_IDEA_STATUS_FILTER';

@Component({
    selector: 'app-ideas-list',
    templateUrl: './ideas-list.component.html',
    styleUrls: ['./ideas-list.component.css']
})
export class IdeasListComponent implements OnInit {

    public ideas$: Observable<Idea[]>;
    public filters: FormGroup;
    ideaStatuses = IdeaStatus;
    public statuses = [
        {
            id: IdeaStatus.Published,
            title: 'Опубликованные'
        },
        {
            id: IdeaStatus.Moderating,
            title: 'Требуют модерации'
        },
        {
            id: IdeaStatus.Archived,
            title: 'Архивированные'
        }
    ]

    constructor(
        private ideaService: IdeaService,
        private router: Router,
        private fb: FormBuilder) {
        this.filters = this.fb.group({
            status: new FormControl(this.getInitFilter()),
        });
        this.filters.controls.status.valueChanges
            .subscribe(value => {
                StorageUtils.setItem(IDEA_STATUS_FILTER_KEY, value);
                this.reloadData()
            });
    }

    ngOnInit() {
        this.reloadData();
    }

    getInitFilter(): any[] {
        let filter = [IdeaStatus.Published, IdeaStatus.Moderating, IdeaStatus.Archived]
        const storageFilter = StorageUtils.getItem(IDEA_STATUS_FILTER_KEY);

        if (storageFilter) {
            filter = storageFilter
        } else {
            StorageUtils.setItem(IDEA_STATUS_FILTER_KEY, filter);
        }

        return filter;
    }

    reloadData() {
        const filters = this.filters.getRawValue();
        const statuses = filters.status || null;
        this.ideas$ = this.ideaService.listAll(null, null, statuses)
    }

    edit(id: number) {
        this.router.navigate(['ideas', id]);
    }
}
