import { NgModule } from '@angular/core';
import { SharedModule} from '../../shared/shared.module';
import { MatComponents} from '../../app.module';

@NgModule({
    declarations: [
    ],
    imports: [
      SharedModule,
      MatComponents
    ],
})
export class AuthSharedModule { }
