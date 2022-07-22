import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { 
  SpinnerService, 
  ToastrService, 
  LocalStoresServices, 
  FormInputErrorMsgService, 
  CryptoJsService, 
} from '../../@core/utils'; 

import { MyAuthService } from '../../@core/services/my-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../my-auth.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  submitted: false;

  permissionsByRole;

  constructor(
    private formBuilder: FormBuilder,
    public formInputErrMsgService: FormInputErrorMsgService,
    private router: Router,
    private myAuthService: MyAuthService,
    private localService: LocalStoresServices,
    private spinnerService: SpinnerService,
    private toasrService: ToastrService,
    private cryptoService: CryptoJsService, 
  ) {}

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(form: any) {
    if(form.name && form.password){
      const pl = new URLSearchParams();
      pl.append('username', form.name);
      pl.append('password', form.password);

      this.spinnerService.loading.next(true);

      this.myAuthService.login(pl).subscribe(
        (res) => {
          this.spinnerService.loading.next(false);

          if (res && res.status === '200') {
            this.localService.saveToken(this.cryptoService.encrypt(res.data.accesstoken));
            this.localService.saveLoggedInUserName(this.cryptoService.encrypt(res.data.username));

            this.toasrService.showToast(
              'SUCCESS',
              'Logged in successfully!',
              'success'
            );
            
            setTimeout(() => {
              this.gotoPages();
            }, 2000);

          } else {
            this.spinnerService.loading.next(false);

            this.toasrService.showToast(
              'ERROR!',
              `${res.status} \n${res.message}`,
              'danger',
              2500
            );
          }
        },
        (err) => {
          this.spinnerService.loading.next(false);

          this.toasrService.showToast(
            'ERROR!',
            `${err.error.status} \n${err.error.message}`,
            'danger',
            2500
          );
        },
      );
    }else{
      this.toasrService.showToast(
        'ERROR',
        'Login Data is Invalid!',
        'danger'
      );
    }
  }

  gotoPages(): void {
    this.router.navigate(['/pages']);
  }
}
