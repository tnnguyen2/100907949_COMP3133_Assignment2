import {Component, OnInit} from '@angular/core';
import {NetworkService} from "../network/network.service";
import {Employee} from "../interface/employee";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{

  employees: Employee[] = [];
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private networkService: NetworkService, private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }
  fetchEmployees(): void {
    this.networkService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      console.log('Employees fetched:', this.employees);
    });
  }

  signOut(): void {
    // Redirect to the login page after signing out
    this.router.navigate(['']);
    this.authenticationService.setAuthenticated(false);
  }

  addEmployee(): void {
    this.router.navigate(['addEmployee']);
    this.authenticationService.setAuthenticated(true);
  }
  confirmDeleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.deleteEmployee(id);
    }
  }

  deleteEmployee(id: string): void {
    this.networkService.deleteEmployee(id).subscribe(() => {
      console.log(`Employee with ID ${id} deleted.`);
      this.showAlertMessage('Employee deleted successfully');
      this.fetchEmployees();
    });
  }
  showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // Hide alert after 3 seconds
  }
}
