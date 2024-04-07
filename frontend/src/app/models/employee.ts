export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  gender: {
    type: string;
    set: (value: string) => string;
  }
  salary: number;
}
