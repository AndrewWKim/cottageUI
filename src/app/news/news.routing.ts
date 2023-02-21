import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { NewsDetailsResolver } from './shared/news-details-resolver.service';
import { NewsEditComponent } from './news-edit/news-edit.component';

const newsRoutes: Routes = [
    {
        path: '',
        component: NewsComponent,
        children: [
            { path: '', component: NewsListComponent },
            {
                path: 'create',
                component: NewsCreateComponent
            },
            {
                path: ':id',
                component: NewsEditComponent,
                resolve: {
                    news: NewsDetailsResolver
                }
            }
        ]
    }
]

export const NewsRouting = RouterModule.forChild(newsRoutes)
