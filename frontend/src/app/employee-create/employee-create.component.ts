import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkService } from '../network/network.service';
import { Employee } from '../interface/employee';
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private networkService: NetworkService,
    private router: Router
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = {
        id: '',
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        email: this.employeeForm.value.email,
        gender: this.employeeForm.value.gender,
        salary: parseFloat(this.employeeForm.value.salary)
      };

      this.networkService.addEmployee(newEmployee).subscribe(
        (response: any) => {
          console.log('Employee added successfully:', response);
          // Reset the form after successful submission
          this.employeeForm.reset();
          this.router.navigate(['/employees']);
        },
        (error: any) => {
          console.error('Error adding employee:', error);
        }
      );
    } else {
      Object.values(this.employeeForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

}
