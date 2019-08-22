import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../../models/UserInfoModel'

@Component({
  selector: 'display-user-data',
  templateUrl: './display-user-data.component.html',
  styleUrls: ['./display-user-data.component.css']
})
export class DisplayUserDataComponent implements OnInit {

  user: UserInfoModel = new UserInfoModel({
      username: "SDH8als987",
      first_name: "John", 
		  last_name: "Doe", 
		  email_id: "email@email.com", 
		  mob_number: 6465465454,
      password: "Idasn2x2#"
  });

  constructor() { }

  ngOnInit() {
  }

}
