// registration-page.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  userDetails = {
    name: '',
    email: '',
    password: '',
    role: '',
    state: '',
    city: '',
    pin: '',
    fields_of_work: '',
  };

  onRoleChange(event: Event) {
    const selectedRole = (event.target as HTMLSelectElement).value;
    this.userDetails.role = selectedRole;

    if (selectedRole !== 'NGO') {
      this.userDetails.state = '';
      this.userDetails.city = '';
      this.userDetails.pin = '';
      this.userDetails.fields_of_work = '';
    }
  }

  // Handle form submission
  onSubmit(form: any) {
    if (form.valid) {
      this.userService.registerUser(this.userDetails).subscribe(
        (response) => {
          console.log('User registered successfully', response);
          Swal.fire('success', 'Succcess 🎉🌟', 'success');
          form.reset();
        },
        (error) => {
          console.error('Error registering user', error);
          Swal.fire('error', 'Request failed', 'error');
        }
      );
    }
  }
}
