import { HttpService } from './../shared/service/http.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  NgForm,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import Swal from 'sweetalert2';
import { CountriesService } from '../shared/module/countries.service';
declare var $: any;

@Component({
  selector: 'app-register-ngo',
  templateUrl: './register-ngo.component.html',
  styleUrls: ['./register-ngo.component.css'],
})
export class RegisterNgoComponent implements OnInit {
  ngoDetails: any = {};
  stateInfo: any = [];
  countryInfo: any = [];
  cityInfo: any = [];
  region: any = {};
  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private country: CountriesService
  ) {}

  userSelectsString: any = '';
  name: any = 'Angular';
  userSelects: any = [];
  suggestions: any = [
    { id: '001', name: 'Agriculture' },
    { id: '002', name: 'Art & Culture' },
    { id: '003', name: 'Biotechnology' },
    { id: '004', name: 'Children' },
    { id: '005', name: 'Civic Issues' },
    { id: '006', name: 'Dalit Upliftment' },
    { id: '007', name: 'Differently Abled' },
    { id: '008', name: 'Disaster Management' },
    { id: '009', name: 'Drinking Water' },
    { id: '010', name: 'Education & Literacy' },
    { id: '011', name: 'Aged/Elderly' },
    { id: '012', name: 'Environment & Forests' },
    { id: '013', name: 'Minority Issues' },
    { id: '014', name: 'Nutrition' },
    { id: '015', name: 'Rural Development & Poverty Alleviation' },
    { id: '016', name: 'Tribal Affairs' },
    { id: '017', name: 'Urban Development & Poverty Alleviation' },
    { id: '018', name: 'Vocational Training' },
    { id: '019', name: 'Water Resources' },
    { id: '020', name: "Women's Development & Empowerment" },
    { id: '021', name: 'Youth Affairs' },
    { id: '022', name: 'Skill Development' },
  ];

  show: boolean = false;
  addNgoForm: any = FormGroup;

  suggest() {
    this.show = true;
  }

  isSelected(s: any) {
    return this.userSelects.findIndex((item: any) => item.id === s.id) > -1
      ? true
      : false;
  }

  selectSuggestion(s: any) {
    this.userSelects.find((item: any) => item.id === s.id)
      ? (this.userSelects = this.userSelects.filter(
          (item: any) => item.id !== s.id
        ))
      : this.userSelects.push(s);
    // this.assignToNgModel();
  }

  deleteSelects(s: any) {
    this.userSelects = this.userSelects.filter((item: any) => item.id !== s.id);
    this.assignToNgModel();
    this.show = false;
  }

  assignToNgModel() {
    this.userSelectsString = '';
    this.userSelects.map(
      (item: any) => (this.userSelectsString += item.name + ' ')
    );
  }

  hidebox(): void {
    this.show = false;
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.country.allCountries().subscribe(
      (data2) => {
        this.countryInfo = data2.Countries;
        //console.log('Data:', this.countryInfo);
      },
      (err) => console.log(err),
      () => {
        console.log('complete');
        this.stateInfo = this.countryInfo[100].States;
        this.cityInfo = this.stateInfo[0].Cities;
      }
    );
  }

  onChangeState(stateValue: any) {
    console.log(stateValue);
    this.cityInfo = this.stateInfo[stateValue].Cities;
    //console.log(this.cityInfo);
  }

  onSubmit(form: NgForm): void {
    console.log(this.ngoDetails);
    console.log(this.userSelects);

    this.ngoDetails.Field = this.userSelects;
    console.log(this.ngoDetails);

    console.log('object to post', this.ngoDetails);

    this.http.post(`ngo/create`, this.ngoDetails).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire('success', 'NGO created successfully', 'success');
        form.reset();
      },

      (error: any) => {
        console.log(error);
        Swal.fire('error', 'Request failed', 'error');
      }
    );
  }
}
