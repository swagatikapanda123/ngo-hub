import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css'],
})
export class RequestPageComponent implements OnInit {
  Request: any = {};
  constructor() {}

  ngOnInit(): void {}
  onSubmit(): void {
    console.log(this.Request);
  }
}
