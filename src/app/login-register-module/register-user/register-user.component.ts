import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit {

  registerUserForm: FormGroup;
  submitted = false;
  registered = false;
  form_errors = {
    'username': '',
    'first_name': '',
    'last_name': '',
    'email_id': '',
    'mob_number': '',
    'password': ''
  }

  validation_messages = {
    'username': {
      'required': 'user name is required.',
      'minlength': 'user name must have more than 3 characters.',
      'maxlength': 'user name must be less than 15 characters.'
    },
    'first_name': {
      'required': 'first name is required.',
      'minlength': 'first name must have more than 4 characters.',
      'maxlength': 'first name should be less than 15 characters.'
    },
    'last_name': {
      'required': 'last name is required.',
      'minlength': 'last name must have more than 4 characters.',
      'maxlength': 'first name should be less than 15 characters.'
    },
    'email_id': {
      'required': 'email id is required.',
      'email': 'email id wrong format.'
    },
    'mob_number': {
      'required': 'mobile number is required.',
      'pattern': 'mobile number should be 10 digit numeric value.'
    },
    'password': {
      'required': 'password is required.',
      'minlength': 'password should be atleast 6 charaters long.',
      'pattern': 'password should contain one uppercase, one lowercase and one numeric, should not contain special character.'
    }
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.registerUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      last_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email_id: ['', [Validators.required, Validators.email]],
      mob_number: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    })

    this.OnChanges();
  }

  PopulateErrorValues() {
    Object.keys(this.form_errors).forEach(form_control => {
      if (this.registerUserForm.controls[form_control].status == 'INVALID') {
        Object.keys(this.registerUserForm.controls[form_control].errors).forEach(error_code => {
          this.form_errors[form_control] += ' ' + this.validation_messages[form_control][error_code];
        })
      }
    })
  }

  OnChanges() {
    this.registerUserForm.valueChanges.subscribe(() => {
      this.form_errors = {
        'username': '',
        'first_name': '',
        'last_name': '',
        'email_id': '',
        'mob_number': '',
        'password': ''
      }
      if (this.submitted) {
        this.PopulateErrorValues();
      }
    })
  }

  OnSubmit(): void {
    this.submitted = true;

    if (this.registerUserForm.invalid == true) {
      this.PopulateErrorValues();
      return;
    }
    else {

      let postData: any = Object.assign(this.registerUserForm.value);
      this.http.post('/api/customer/register', postData).subscribe((data: any) => {
        let path = '/user/' + data.customer.uid;
        this.router.navigate([path]);
      }, error => {
        this.form_errors = error.error;
      });


      this.registered = true;

    }
  }

}
