import { MatDialog } from '@angular/material/dialog';
import { Classroom } from '@shared/models/Classroom';
import { MatButton } from '@angular/material/button';
import { AuthService } from '@shared/services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { ClassroomService } from '@shared/services/classroom/classroom.service';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// interface Classroom {
//   id: string;
//   level: string;
//   subject: string;
//   studentCount: number;
//   color: string;
// }

@Component({
  selector: 'app-classrooms',
  imports: [RouterModule, MatButton, ReactiveFormsModule],
  templateUrl: './classrooms.component.html',
  styleUrl: './classrooms.component.scss',
})
export class ClassroomsComponent implements OnInit {
  isLoading = false;
  classrooms: Classroom[] = [];
  readonly dialog = inject(MatDialog);

  constructor(
    private authService: AuthService,
    private classroomService: ClassroomService,
    private fb: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle('ห้องเรียนทั้งหมด');
  }

  ngOnInit(): void {
    this.getAllClassroom();
  }

  getAllClassroom() {
    this.isLoading = true;
    this.classroomService.getAllClassroom().subscribe({
      next: (data: Classroom[]) => {
        this.classrooms = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching classrooms', err);
      },
    });
  }

  openCreateDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    console.log('openCreateDialog Clicked.');
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        animal: 'panda',
      },
      autoFocus: false,
    });

    dialogRef.componentInstance.classroomCreated.subscribe(() => {
      this.getAllClassroom();
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
  // ];
}
