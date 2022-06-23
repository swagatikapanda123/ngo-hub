import { HttpService } from './../shared/service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { CountriesService } from '../shared/module/countries.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  region: any = {};
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  stateInfo: any = [];
  countryInfo: any = [];
  cityInfo: any = [];

  slides = [
    { img: 'https://via.placeholder.com/600.png/09f/fff' },
    { img: 'https://via.placeholder.com/600.png/021/fff' },
    { img: 'https://via.placeholder.com/600.png/321/fff' },
    { img: 'https://via.placeholder.com/600.png/422/fff' },
    { img: 'https://via.placeholder.com/600.png/654/fff' },
  ];
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };
  addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor(
    private country: CountriesService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCountries();
    // $(document).ready(function () {
    //   var scroll_start: any = 0;
    //   var startchange: any = $('#startchange');
    //   var offset: any = startchange.offset();
    //   if (startchange.length) {
    //     $(document).scroll(function () {
    //       scroll_start = $(this).scrollTop();
    //       if (scroll_start > offset.top) {
    //         $('.navbar-default').css('background-color', '#c1292e');
    //       } else {
    //         $('.navbar-default').css('background-color', 'transparent');
    //       }
    //     });
    //   }
    // });
  }

  getCountries() {
    this.country.allCountries().subscribe(
      (data2) => {
        this.countryInfo = data2.Countries;
        //console.log('Data:', this.countryInfo);
      },
      (err) => console.log(err),
      () => console.log('complete')
    );
  }

  onChangeCountry(countryValue: any) {
    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue: any) {
    this.cityInfo = this.stateInfo[stateValue].Cities;
    //console.log(this.cityInfo);
  }

  onSubmit(): void {
    console.log(this.region);
    this.router.navigate([`/list-ngos/${this.region.place}`]);
  }
}
