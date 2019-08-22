import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'  

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private user;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('/api/customer/getSessionDetails').subscribe((data: any) => 
      {
        console.log('session details read success : ' + data);
        this.user = data;
      }, error => 
      {
        console.log('error while getting session details')
        this.redirectToLogin();
      });
  }

  redirectToLogin() 
  {
    let path = '/login';
    this.router.navigate([path]);
  }

}
