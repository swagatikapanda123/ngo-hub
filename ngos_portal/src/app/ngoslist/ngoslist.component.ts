import { HttpService } from './../shared/service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-ngoslist',
  templateUrl: './ngoslist.component.html',
  styleUrls: ['./ngoslist.component.css'],
})
export class NgoslistComponent implements OnInit {
  ngos: any = {};
  region: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.region = params.location;
    });

    this.http.get(`ngo/ngoByLocation/${this.region}`).subscribe(
      (res: any) => {
        console.log(res);
        this.ngos = res;
      },

      (error: any) => {
        console.log(error);
      }
    );
  }
}
