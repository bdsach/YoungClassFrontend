export interface Classroom {
  id: number;
  name: string;
  description: string;
  category: string;
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
