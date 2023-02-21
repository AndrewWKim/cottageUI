import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';

@NgModule({
    imports: [
        SharedPipesModule,
        SharedComponentsModule,
        SharedDirectivesModule
    ],
    exports: [
        HttpClientModule,
        SharedPipesModule,
        SharedComponentsModule,
        SharedDirectivesModule
    ],
})
export class SharedModule { }
