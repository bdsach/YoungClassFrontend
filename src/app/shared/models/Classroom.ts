import { Student } from './Student';

export interface Classroom {
  id: number;
  subject: string;
  gradeLevel: string;
  room: string;
  subjectGroup: string;
  students: Student[];
}

export interface CreateClassroom {
  name: string;
  description: string;
  category: string;
}

// export interface CreateEnrollmentRequest {
//   userName: string
//   email: string
//   classroomId: number
// }

export interface BulkEnrollmentRequest {
  enrollments: {
    userName: string;
    email: string;
  }[];
  classroomId: number;
}
