export interface PaymentFile {
  root: { row: Payment[] };
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
