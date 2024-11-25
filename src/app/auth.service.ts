import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface DecodedToken {
  exp: number;
  role?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient)
  {}
 
  private strValue =
  // {
  //   "email": "shubham@abc.com",
  //   "password": "Nik@123"
  // }
  {
    "username": "testuser2",
    "password": "password123"
  }
   
  isAuthenticated(): boolean {
    const token:any = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    
    let token = localStorage.getItem('accessToken');
    return token;
  }

  getRole(): Observable<any> {
    return this.http.get('https://localhost:7217/api/Auth/GetUserRoles', {
      params: { username: this.strValue.username },responseType: 'text'});
    
  }

  hasRole(expectedRoles: Array<string>): boolean {
    let userRole = localStorage.getItem('Role');
    return expectedRoles.includes(userRole!!);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      return expirationDate < new Date();
    } catch (error) {
      console.error('Failed to decode token:', error);

      
      return true; // Assume expired if token is invalid
    }
  }

  login(): Observable<any>{
    
    return this.http.post('https://localhost:7217/api/Auth/login',this.strValue,{ responseType: 'text' })
      
  }
  
  refreshToken(): Observable<any> {
    let token = {
      accessToken :localStorage.getItem('accessToken'),
      refreshToken :localStorage.getItem('refreshToken')
    }
    return this.http.post('https://localhost:7217/api/Auth/refresh-token',{token}, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('Role');
  }
  getInfo(): Observable<any>{    
    return this.http.get('https://localhost:7217/api/Testing/Info',{ responseType: 'text' })
  }
}
