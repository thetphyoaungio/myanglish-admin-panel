import { NgModule } from '@angular/core';

import { FormsModule as ngFormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { 
    NbLayoutModule, 
    NbInputModule,
    NbCardModule,
    NbAlertModule,
    NbCheckboxModule,
    NbButtonModule,
    NbSpinnerModule,
} from '@nebular/theme';

import { MyAuthRoutingModule } from './my-auth-routing.module';
import { MyAuthComponent } from './my-auth.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestPasswordComponent } from './request-password/request-password.component';

@NgModule({
  imports: [
    MyAuthRoutingModule,
    ngFormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbLayoutModule,
    NbInputModule,
    NbCardModule,
    NbAlertModule,
    NbCheckboxModule,
    NbButtonModule,
    NbSpinnerModule,
  ],
  declarations: [
    MyAuthComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    RequestPasswordComponent,
  ],
})
export class MyAuthModule {
}
