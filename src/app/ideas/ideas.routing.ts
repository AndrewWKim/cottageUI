import { Routes, RouterModule } from '@angular/router';
import { IdeasComponent } from './ideas.component';
import { IdeasListComponent } from './ideas-list/ideas-list.component';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { IdeaDetailsResolver } from './shared/idea-details-resolver.service';
import { IdeaEditComponent } from './idea-edit/idea-edit.component';

const ideasRoutes: Routes = [
    {
        path: '',
        component: IdeasComponent,
        children: [
            { path: '', component: IdeasListComponent },
            {
                path: 'create',
                component: IdeaCreateComponent
            },
            {
                path: ':id',
                component: IdeaEditComponent,
                resolve: {
                    idea: IdeaDetailsResolver
                }
            }
        ]
    }
]

export const IdeasRouting = RouterModule.forChild(ideasRoutes)
