import { HttpService } from './../shared/service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ngo-dashboard',
  templateUrl: './ngo-dashboard.component.html',
  styleUrls: ['./ngo-dashboard.component.css'],
})
export class NgoDashboardComponent implements OnInit {
  token: any = '';
  ngoId: any = '';
  requests: any = {};
  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['ngo/login']);
    }

    // this.route.params.subscribe((params: any) => {
    //   console.log(params);
    //   this.sector = params.sector;
    // });

    this.ngoId = localStorage.getItem('id');

    this.http.get(`request/requestByNgo/${this.ngoId}`).subscribe(
      (res: any) => {
        console.log(res);
        this.requests = res;
        console.log(this.requests);
      },

      (error: any) => {
        console.log(error);
      }
    );
  }
}
