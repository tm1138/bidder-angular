import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'



@Component({
  selector: 'input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})



export class InputUserDataFormComponent implements OnInit {
    registered = false;
    submitted = false;
    userForm: FormGroup;
    guid: string;
    serviceErrors: any = {};


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router)
  {
  }

  invalidUserName()
  {
    return (this.submitted && (this.serviceErrors.username != null || this.userForm.controls.username.errors != null));
  }

  invalidFirstName()
  {
  	return (this.submitted && (this.serviceErrors.first_name != null || this.userForm.controls.first_name.errors != null));
  }

  invalidLastName()
  {
  	return (this.submitted && (this.serviceErrors.last_name != null || this.userForm.controls.last_name.errors != null));
  }

  invalidEmail()
  {
  	return (this.submitted && (this.serviceErrors.email_id != null || this.userForm.controls.email_id.errors != null));
  }

  invalidMobileNumber()
  {
  	return (this.submitted && (this.serviceErrors.mob_number != null || this.userForm.controls.mob_number.errors != null));
  }

  invalidPassword()
  {
  	return (this.submitted && (this.serviceErrors.password != null || this.userForm.controls.password.errors != null));
  }


  ngOnInit()
  {
      this.userForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required, Validators.maxLength(50)]],
            email_id: ['', [Validators.required, Validators.email]],
            mob_number: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
            //password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("[0-9]{10}")]]
      });
  }


  onSubmit()
  {

    //debugger;
    this.submitted = true;

    if (this.userForm.invalid == true)
    {
      return;
    }
    else
    {

      let postData: any = Object.assign(this.userForm.value);
      this.http.post('/api/customer/register', postData).subscribe((data: any) => 
      {
        let path = '/user/' + data.customer.uid;
        this.router.navigate([path]);
      }, error => 
      {
        this.serviceErrors = error.error.error;
      });

      this.registered = true;

    }
  }


};
