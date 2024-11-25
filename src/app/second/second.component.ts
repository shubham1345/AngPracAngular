import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [],
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {

  constructor(private authService: AuthService) {}
  
  getInfo()
  {
    this.authService.getInfo().subscribe(
      (data :any)=>{
        console.log('data',data);
      },
      (error:any)=>{
        console.log(error);
      }

    );
  }
}
