import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

import { SPTDialogsModule } from '../app/shared-components/dialogs/dialogs.module';
import { MyanTransTablesModule } from './shared-components/tables/tables.module';

import { authInterceptorProviders } from './@core/utils/auth-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    SPTDialogsModule,
    MyanTransTablesModule,
  ],
  providers:[authInterceptorProviders],
  bootstrap: [AppComponent],
  exports:[SPTDialogsModule, MyanTransTablesModule]
})
export class AppModule {
}
