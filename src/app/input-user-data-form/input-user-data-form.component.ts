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
    this.http.get('/api/v1/generate_uid').subscribe((data: any) => {
      this.guid = data.guid;
    }, error => {
      console.log("there was an error generating guid on this server", error);
    });
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
  	return (this.submitted && (this.serviceErrors.email != null || this.userForm.controls.email.errors != null));
  }

  invalidMobileNumber()
  {
  	return (this.submitted && (this.serviceErrors.mobile_number != null || this.userForm.controls.mobile_number.errors != null));
  }

  invalidPassword()
  {
  	return (this.submitted && (this.serviceErrors.password != null || this.userForm.controls.password.errors != null));
  }


  ngOnInit() 
  {
      this.userForm = this.formBuilder.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            mobile_number: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
      });
  }


  onSubmit()
  {

    debugger;
    this.submitted = true;

    if (this.userForm.invalid == true)
    {
      return;
    }
    else
    {

      let data: any = Object.assign({guid: this.guid}, this.userForm.value)
      this.http.post('/api/v1/customer', data).subscribe((data: any) => 
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
