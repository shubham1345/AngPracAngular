import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { error } from 'node:console';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as Array<string>;
  let token = authService.getToken();
  if(token == null)
  {
    token = "";
  }
  if (authService.isAuthenticated()) {

    if( authService.hasRole(expectedRoles)) {
      return true;
    }
    else{
    router.navigate(['/access-denied']);
    return false;
    }
  } 

  else {    
    authService.refreshToken().subscribe(
      (data:any)=>{
        console.log(data);
      },
      (error:any)=>{
        console.log(error);
      }
    )
    return false;
  }
};
