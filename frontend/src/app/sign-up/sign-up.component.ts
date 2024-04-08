import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NetworkService} from "../network/network.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private networkService: NetworkService, private fb: FormBuilder, private router: Router ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const username = this.signupForm.value.username;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      this.networkService.signup(username, email, password).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }
}
