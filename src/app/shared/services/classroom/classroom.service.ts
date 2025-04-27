import {
  BulkEnrollmentRequest,
  Classroom,
  CreateClassroom,
} from '@shared/models/Classroom';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private apiUrl = 'http://localhost:5271/api/classrooms';

  constructor(private http: HttpClient) {}

  getAllClassroom(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl);
  }

  getClassroomById(id: number) {
    return this.http.get<Classroom>(`${this.apiUrl}/${id}`);
  }

  createClassroom(body: CreateClassroom) {
    return this.http.post<CreateClassroom>(this.apiUrl, body);
  }

  // enrollment() {
  //   return this.http.post<CreateEnrollmentRequest>(
  //     `http://localhost:5271/api/classrooms-enrollments/65`,
  //     {
  //       userName: 'studentone',
  //       email: 'studentone@email.com',
  //     },
  //   );
  // }

  bulkEnrollment(classroomId: number, body: BulkEnrollmentRequest) {
    return this.http.post<BulkEnrollmentRequest>(
      `http://localhost:5271/api/classrooms-enrollments/${classroomId}/bulk`,
      body,
    );
  }
}
