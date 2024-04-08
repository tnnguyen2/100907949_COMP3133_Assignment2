import {Component, OnInit} from '@angular/core';
import {NetworkService} from "../network/network.service";
import {Employee} from "../interface/employee";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  detailMessage: string = '';
  employee: Employee | undefined;


  constructor(private networkService: NetworkService, private router: Router, private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('Route Parameters:', params);
      const id = params.get('id');
      console.log('Employee ID:', id);
      if (id) {
        this.networkService.getEmployeeById(id).subscribe(
          (employee: Employee) => {
            if (employee) {
              this.employee = employee;
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
}
