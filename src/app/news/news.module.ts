import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NewsRouting } from 'app/news/news.routing';
import { MatComponents } from '../app.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthSharedModule } from 'app/auth/shared/auth-shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { NewsFormComponent } from './shared/news-form/news-form.component';
import { NewsService } from 'app/shared/services/news.service';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsDetailsResolver } from './shared/news-details-resolver.service';

@NgModule({
    imports: [
        SharedModule,
        NewsRouting,
        MatComponents,
        TextMaskModule,
        AuthSharedModule,
        MatDialogModule,
    ],
    providers: [NewsService, NewsDetailsResolver],
    declarations: [
        NewsComponent,
        NewsListComponent,
        NewsCreateComponent,
        NewsFormComponent,
        NewsEditComponent,
    ],
})
export class NewsModule {}
