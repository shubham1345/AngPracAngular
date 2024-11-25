import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const interFileInterceptor: HttpInterceptorFn = (req, next) => {
  // Assuming you retrieve the token from localStorage or another service
  
  const token = localStorage.getItem('accessToken');

  // Clone the request to add the new header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(authReq).pipe(
    tap({
      next: event => {
        if (event.type === HttpEventType.Response) {
          console.log('Response Status Code:', event.status);
          // You can also perform some action based on the status code here
        }
      },
      error: err => {
        console.error('Error Status Code:', err.status);
        if (err.status == 401 || err.status == 403) {
            
             
        }
      }
    })
  ); 
};
