import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
  NbMediaBreakpointsService, 
  NbMenuService, 
  NbSidebarService, 
  NbThemeService,  
} from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { 
  LocalStoresServices, 
  CryptoJsService, 
  SpinnerService, 
  ToastrService,
} from '../../../@core/utils';

import { MyAuthService } from '../../../@core/services/my-auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'dark';//cosmic

  userMenu = [ { title: 'Log out' } ];//{ title: 'Profile' },
  userName:string|null;

  constructor(
    private sidebarService: NbSidebarService, 
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private localServices: LocalStoresServices,
    private cryptoService: CryptoJsService, 
    private spinnerService: SpinnerService, 
    private myAuthService: MyAuthService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    const tmp = this.localServices.getLoggedInUserName();
    //console.log('#tmp', tmp);
    
    if(tmp){
      this.userName = this.cryptoService.decrypt(tmp);
      //console.log('#this.userName',this.userName);
    }
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        this.user = users.nick;
        this.user.name = this.userName;
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    /* this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName); */

      this.menuService.onItemClick()
      .pipe(
        //filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title }}) => title
        ),
      )
      .subscribe(title => {
        switch(title){
          case 'Log out':{
            this.logout();

            sessionStorage.clear();
            break;
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  //
  logout():void {
    this.spinnerService.loading.next(true);

    this.myAuthService.logout().subscribe(
    res => {
        if(res && res.status==='200'){
            this.localServices.clearAuth();

            this.spinnerService.loading.next(false);

            this.toastrService.showToast('SUCCESS', `${res.message}`, 'success');

            setTimeout(() => {
                this.router.navigate(['/auth']);
            }, 2000);
        }else{
            this.errorHandler(res);
        }
    },
    err => {
        this.errorHandler(err.error);
    });
  }

  errorHandler(err){
      this.spinnerService.loading.next(false);
      
      if(err.message==="Not logged in yet." || err.status==="400"){
          this.localServices.clearAuth();

          this.router.navigate(['/auth']);
      }
  }
}
