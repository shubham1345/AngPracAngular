import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Fixed `styleUrl` to `styleUrls`
})
export class LoginComponent {
  token: any ={
    accessToken: "",
    refreshToken: ""
  };

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login().subscribe(
      (data: any) => {
        if (data) {
          this.token = JSON.parse(data);
          localStorage.setItem('accessToken', this.token.accessToken);
          localStorage.setItem('refreshToken', this.token.refreshToken);
          console.log('Login successful, token stored:', this.token);
          this.getUserRole();
        } else {
          console.error('No token received');
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
      }
    );
  }

  getUserRole():void {
    this.authService.getRole().subscribe(
      (data:any)=>{
        localStorage.setItem('Role', data);
        console.log('Login user role successful stored:', data);
      },(error:any)=>
      {
        localStorage.setItem('Role', "");
      }      
    );
  }

}
