import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { IdeasRouting } from 'app/ideas/ideas.routing';
import { MatComponents } from '../app.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthSharedModule } from 'app/auth/shared/auth-shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { IdeasListComponent } from './ideas-list/ideas-list.component';
import { IdeasComponent } from './ideas.component';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { IdeaFormComponent } from './shared/idea-form/idea-form.component';
import { IdeaService } from 'app/shared/services/idea.service';
import { IdeaEditComponent } from './idea-edit/idea-edit.component';
import { IdeaDetailsResolver } from './shared/idea-details-resolver.service';

@NgModule({
  imports: [
      SharedModule,
      IdeasRouting,
      MatComponents,
      TextMaskModule,
      AuthSharedModule,
      MatDialogModule
  ],
  providers: [
      IdeaService,
      IdeaDetailsResolver
  ],
  declarations: [
      IdeasComponent,
      IdeasListComponent,
      IdeaCreateComponent,
      IdeaFormComponent,
      IdeaEditComponent
  ],
})
export class IdeasModule {
}
