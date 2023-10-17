export const BACKEND_URL = 'http://localhost:3001';

export interface PaymentFile {
  root: { row: Payment[] };
}

export interface Entity {
  uid: string;
  type: "individual" | "corporate",
  individual?: Individual;
  corporation?: Corporation;
  address?: Address;
}

export interface Individual {
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  dob?: string;
}

export interface Corporation {
  name: string;
  dba?: string;
  ein: string;
  owners: [];
}

export interface Payment {
  Employee: Employee;
  Payor: Payor;
  Payee: Payee;
  Amount: string;
}

// Since "info about employees may be innacurate" assume worst case where fields are missing
export interface Employee {
  DunkinId?: string;
  DunkinBranch?: string;
  FirstName?: string;
  LastName?: string;
  DOB?: string;
  PhoneNumber?: string;
}

export interface Payor {
  DunkinId: string;
  ABARouting: string;
  AccountNumber: string;
  Name: string;
  DBA: string;
  EIN: string;
  Address: Address;
}

export interface Address {
  Line1: string;
  City: string;
  State: string;
  Zip: string;
}

export interface Payee {
  PlaidId: string;
  LoanAccountNumber: string;
}

export const enum TopBarTab {
  Payouts = 'Payouts',
  Reporting = 'Reporting'
}
