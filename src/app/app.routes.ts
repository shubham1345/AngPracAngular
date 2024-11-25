import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { authGuard } from './auth.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';
import { ThirdComponent } from './third/third.component';

export const routes: Routes = [
   { 
      path: 'first', 
      component: FirstComponent, 
      canActivate: [authGuard], 
      data: { roles: ['admin','user'] } 
    },
    { 
      path: 'second', 
      component: SecondComponent, 
      canActivate: [authGuard], 
      data: { roles: ['phc','user'] } 
    },
    { 
      path: 'third', 
      component: ThirdComponent, 
      canActivate: [authGuard], 
      data: { roles: ['user'] } 
    },
    { 
      path: 'login', 
      component: LoginComponent 
    },
    { 
      path: 'access-denied', 
      component: AccessDeniedComponent 
    },
];
