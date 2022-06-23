import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  userDetails: any = {};
  public loading: boolean = false;
  emailPattern: any = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.userDetails);
  }
}
