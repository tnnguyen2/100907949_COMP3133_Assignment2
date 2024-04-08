import {Component, OnInit} from '@angular/core';
import {NetworkService} from '../network/network.service';
import {Employee} from '../interface/employee';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee | undefined;
  detailMessage: string = '';
  employeeForm: FormGroup;

  constructor(private networkService: NetworkService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.networkService.getEmployeeById(id).subscribe(
          (employee: Employee) => {
            if (employee) {
              this.employee = employee;
              this.employeeForm.patchValue({
                id: employee.id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                salary: employee.salary
              });
            } else {
              this.detailMessage = 'Employee not found!';
            }
          },
          (error) => {
            console.error('Error fetching employee:', error);
            this.detailMessage = 'Error fetching employee details.';
          }
        );
      } else {
        this.detailMessage = 'Employee ID not provided.';
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee = this.employeeForm.value;
      this.networkService.updateEmployee(updatedEmployee).subscribe(
        (updatedEmployee: Employee) => {
          console.log('Employee updated successfully:', updatedEmployee);
          this.router.navigate(['/employees']); // Redirect to employee list after update
        },
        (error) => {
          console.error('Error updating employee:', error);
          this.detailMessage = 'Error updating employee details.';
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
