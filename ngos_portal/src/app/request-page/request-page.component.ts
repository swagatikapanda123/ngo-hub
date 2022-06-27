import { HttpService } from './../shared/service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
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
  id: any = '';
  ngo_details: any = {};
  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.id = params.id;
    });

    this.http.get(`ngo/ngoById/${this.id}`).subscribe(
      (res: any) => {
        console.log(res);
        this.ngo_details = res;
      },

      (error: any) => {
        console.log(error);
      }
    );
  }

  onSubmit(form: NgForm): void {
    this.Request.NgoDetails = this.ngo_details;
    console.log(this.Request);
    this.http.post(`request/create`, this.Request).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire('success', 'Request submitted successfully', 'success');
        form.reset();
      },

      (error: any) => {
        console.log(error);
        Swal.fire('error', 'Request Failed', 'error');
      }
    );
  }
}
