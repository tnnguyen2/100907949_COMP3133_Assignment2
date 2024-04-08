import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Employee} from "../interface/employee";
import {User} from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private baseUrl = 'http://localhost:3000/graphQL'; // URL of the GraphQL server

  constructor(private http: HttpClient) {
  }

  query(query: string): Observable<any> {
    return this.http.post(this.baseUrl, {query}); // Sending GraphQL query as a POST request
  }

  getAllEmployees(): Observable<Employee[]> {
    const query = `
    query {
      getAllEmployees {
        id
        firstName
        lastName
        email
        gender
        salary
      }
    }
  `;
    return this.query(query).pipe(map((response: any) => response.data.getAllEmployees));
  }

  login(usernameOrEmail: string, password: string): Observable<User[]> {
    const query = `
    query {
      login(usernameOrEmail: "${usernameOrEmail}", password: "${password}"){
        user{
          id
          username
          email
        }
      }
    }
  `;
    return this.query(query).pipe(map((response: any) => response.data.login.user));
  }

  getEmployeeById(id: string): Observable<Employee> {
    const query = `
    query {
      getEmployeeById(id: "${id}") {
        id
        firstName
        lastName
        email
        gender
        salary
        }
      }
    `;
    return this.query(query).pipe(map((response: any) => response.data.getEmployeeById));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const mutation = `
      mutation AddEmployee($firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!){
         addEmployee(firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, salary: $salary) {
          id
          firstName
          lastName
          email
          gender
          salary
        }
      }
    `;

    return this.http.post<Employee>(this.baseUrl, {
      query: mutation,
      variables: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        gender: employee.gender,
        salary: employee.salary
      }
    });
  }

  deleteEmployee(id: string): Observable<any> {
    const mutation = `
      mutation {
        deleteEmployee(id: "${id}")
      }
    `;
    return this.query(mutation);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const mutation = `
      mutation UpdateEmployee($id: ID!, $firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!){
         updateEmployee(id: $id, firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, salary: $salary) {
          id
          firstName
          lastName
          email
          gender
          salary
      }
    }
  `;
    return this.http.post<Employee>(this.baseUrl, {
      query: mutation,
      variables: {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        gender: employee.gender,
        salary: employee.salary
      }
    });
  }

  signup(username: string, email: string, password: string): Observable<User[]> {
    const mutation= `
   mutation signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
            id
            username
            email
        }
      }
    `;
    return this.http.post<User[]>(this.baseUrl, {
      query: mutation,
      variables: {
        username: username,
        email: email,
        password: password
      }
    })
  }
}
