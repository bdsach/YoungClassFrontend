export interface Student {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateStudent {
  studentId: string;
  email: string;
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string;
  lastNameEn: string;
}
