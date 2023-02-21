import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AppRouting } from 'app/app.routing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MasterComponent } from './master/master.component';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TextMaskModule } from 'angular2-text-mask';
import { DragulaModule } from 'ng2-dragula';
import { OneTimeDirective } from './shared/directives/one-time.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertService } from './shared/services/alert.service';
import { CommonService } from './shared/services/common.service';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './core/http-response.interceptor';
import { getRuPaginatorIntl } from './shared/utils/ru-paginator-intl';
import { NewsComponent } from './news/news.component';
import { SettingsComponent } from './settings/settings.component';
registerLocaleData(localeRu);

export const MatComponents = [
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        OneTimeDirective,
        MasterComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        AppRouting,
        BrowserAnimationsModule,
        MatComponents,
        FormsModule,
        TextMaskModule,
        DragulaModule
    ],
    providers: [
        AlertService,
        CommonService,
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: LOCALE_ID, useValue: 'ru-RU'},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpResponseInterceptor,
            multi: true
        },
        { provide: MatPaginatorIntl, useValue: getRuPaginatorIntl() }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
