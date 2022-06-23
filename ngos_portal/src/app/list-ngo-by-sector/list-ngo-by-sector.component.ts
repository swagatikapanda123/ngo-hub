import { HttpService } from './../shared/service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-list-ngo-by-sector',
  templateUrl: './list-ngo-by-sector.component.html',
  styleUrls: ['./list-ngo-by-sector.component.css'],
})
export class ListNgoBySectorComponent implements OnInit {
  ngos: any = {};
  sector: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.sector = params.sector;
    });

    this.http.get(`ngo/ngoBySector/${this.sector}`).subscribe(
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
