import { Title } from '@angular/platform-browser';
import { Student } from '@shared/models/Student';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImportStudentDialogComponent } from './import-student-dialog/import-student-dialog.component';
import { Component, inject, input, OnInit } from '@angular/core';
import { ClassroomService } from '@shared/services/classroom/classroom.service';

@Component({
  selector: 'app-classroom',
  imports: [RouterModule, MatTableModule, MatTabsModule],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss',
})
export class ClassroomComponent implements OnInit {
  readonly id = input<string>();
  readonly dialog = inject(MatDialog);

  students: Student[] = [];
  totalGroup: number = 3;

  constructor(
    private titleService: Title,
    private classroomService: ClassroomService,
  ) {}

  ngOnInit(): void {
    
    this.classroomService.getClassroomById(Number(this.id())).subscribe({
      next: (data) => {
        console.log(data);
        this.students = data.students;
        this.titleService.setTitle(data.subject);
      },
      error: (err) => {
        console.error('Error fetching classroom:', err);
      },
    });
  }

  get idValue(): string {
    return this.id() ?? '';
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        animal: 'panda',
      },
      autoFocus: false,
    });
  }

  openCreateStudentDialog(
    enterAnimationDuration: string = '150ms',
    exitAnimationDuration: string = '250ms',
  ): void {
    this.dialog.open(ImportStudentDialogComponent, {
      minWidth: '800px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      autoFocus: false,
      data: {
        classroomId: Number(this.id()),
      },
    });
  }
}
