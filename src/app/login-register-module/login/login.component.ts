import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  form_errors = {
    'username': '',
    'password': ''
  }

  validation_messages = {
    'username': {
      'required': 'user name is required.',
    },
    'password': {
      'required': 'password is required.',
    }
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.OnChanges();
  }

  PopulateErrorValues() {
    Object.keys(this.form_errors).forEach(form_control => {
      if (this.loginForm.controls[form_control].status == 'INVALID') {
        Object.keys(this.loginForm.controls[form_control].errors).forEach(error_code => {
          this.form_errors[form_control] += ' ' + this.validation_messages[form_control][error_code];
        })
      }
    })
  }

  OnChanges() {
    this.loginForm.valueChanges.subscribe(() => {
      this.form_errors = {
        'username': '',
        'password': ''
      }
      if (this.submitted) {
        this.PopulateErrorValues();
      }
    })
  }

  OnSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid == true) {
      this.PopulateErrorValues();
      return;
    }
    else {
      this.http.post('/api/customer/login', Object.assign(this.loginForm.value)).subscribe(
        (data: any) => {
          this.router.navigate(['/home']);
        },
        error => {
          this.form_errors.password = error.error.error;
        }
      )
    }
  }

}
