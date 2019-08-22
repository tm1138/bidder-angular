import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'  

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  serviceErrors: any = {};

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) 
  {
    
  }

  invalidLoginUsername()
  {
    return (this.submitted && (this.serviceErrors != null || this.loginForm.controls.login_username.errors != null))
  }

  invalidLoginPassword()
  {
    return (this.submitted && (this.serviceErrors != null || this.loginForm.controls.login_password.errors != null))
  }

  ngOnInit()
  {
    this.loginForm = this.formBuilder.group({
      login_username: ['', [Validators.required, Validators.minLength(1)]],
      login_password: ['', [Validators.required, Validators.minLength(1)]]
    })  
  }

  onSubmit()
  {
    this.submitted = true;

    if (this.loginForm.invalid == true)
    {
      return;
    }

    else
    {
      let loginData: any = Object.assign(this.loginForm.value);
      this.http.post('/api/customer/login', loginData).subscribe( (data:any) => {
        let path = '/home';
        this.router.navigate([path]);
      }, error => {
        this.serviceErrors = error;
        console.log(error);
      })

      
    }
  }

  RedirectToRegister()
  {
    let path = '/register';
    this.router.navigate([path]);
  }

}
