import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ClassroomService } from '../../shared/services/classroom/classroom.service';
import { Classroom } from '../../shared/models/Classroom';

// interface Classroom {
//   id: string;
//   level: string;
//   subject: string;
//   studentCount: number;
//   color: string;
// }

@Component({
  selector: 'app-classrooms',
  imports: [RouterModule, MatButton],
  templateUrl: './classrooms.component.html',
  styleUrl: './classrooms.component.scss',
})
export class ClassroomsComponent implements OnInit {
  isLoading = false;
  classrooms: Classroom[] = [];

  constructor(private authService: AuthService, private classroomService: ClassroomService) {}

  ngOnInit(): void {
    this.getAllClassroom();
  }

  getAllClassroom() {
    this.isLoading = true
    this.classroomService.getAllClassroom().subscribe({
      next: (data: Classroom[]) => {
        this.classrooms = data;
        this.isLoading = false
      },
      error: (err) => {
        console.error('Error fetching classrooms', err);
      }
    })
  }

  createClassroom() {
    this.classroomService.createClassroom().subscribe({
      next: () => {
        console.log('Classroom created successfull')
        alert('✅ Classroom created successfully!');
        this.getAllClassroom();
      },
      error: (err) => {
        console.error("❌ Error on create Classroom", err)
        alert("❌ Error on create Classroom")
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  // classrooms: Classroom[] = [
  //   {
  //     id: '1',
  //     level: 'ป.1/1',
  //     subject: 'คอมพิวเตอร์',
  //     studentCount: 0,
  //     color: 'purple',

  //   },
  //   {
  //     id: '2',
  //     level: 'ป.2/1',
  //     subject: 'วิทยาศาสตร์',
  //     studentCount: 25,
  //     color: 'red',
  //   },
  //   {
  //     id: '3',
  //     level: 'ป.3/1',
  //     subject: 'คณิตศาสตร์',
  //     studentCount: 30,
  //     color: 'purple',
  //   },
  //   {
  //     id: '4',
  //     level: 'ป.4/2',
  //     subject: 'ภาษาไทย',
  //     studentCount: 22,
  //     color: 'yello',
  //   },
  //   {
  //     id: '5',
  //     level: 'ป.5/1',
  //     subject: 'อังกฤษ',
  //     studentCount: 27,
  //     color: 'purple',
  //   },
  //   {
  //     id: '6',
  //     level: 'ป.6/1',
  //     subject: 'สังคมศึกษา',
  //     studentCount: 18,
  //     color: '#0EA5E9',  
  //   },
  // ];  
}
