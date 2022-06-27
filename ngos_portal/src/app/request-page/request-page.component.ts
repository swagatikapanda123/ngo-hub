import { HttpService } from './../shared/service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css'],
})
export class RequestPageComponent implements OnInit {
  Request: any = {};
  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  onSubmit(): void {
    console.log(this.Request);
    this.http.post(`request/create`, this.Request).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire('success', 'Request submitted successfully', 'success');
      },

      (error: any) => {
        console.log(error);
        Swal.fire('error', 'Request Failed', 'error');
      }
    );
  }
}
