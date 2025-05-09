import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Student } from '@shared/models/Student';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClassroomService } from '@shared/services/classroom/classroom.service';

@Component({
  selector: 'app-import-student-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './import-student-dialog.component.html',
  styleUrl: './import-student-dialog.component.scss',
})
export class ImportStudentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ImportStudentDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  studentForm: FormGroup;
  students: Student[] = [];
  csvError: string | null = null;

  placeholders = {
    no: 'เลขที่',
    firstName: 'ชื่อ',
    lastName: 'สกุล',
  };

  constructor(private fb: FormBuilder, private classroomService: ClassroomService) {
    this.studentForm = this.fb.group({
      no: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  addStudentToList() {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;
      this.students.push(student);
      this.studentForm.reset();
    }
  }
  
  createStudent() {
    const classroomId = this.data.classroomId;
    const body = {
      classroomId,
      enrollments: this.students.map((student) => ({
        userName: student.firstName + student.lastName,
        email: `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}@email.com`, // สมมติ auto gen email ง่ายๆ
      })),
    };

    this.classroomService.bulkEnrollment(classroomId, body).subscribe({
      next: () => {
        console.log("bulk create students successfully.");
        this.dialogRef.close();
      },
      error: (err) => {
        console.log("error on bulk create students", err);
        alert("error on bulk create students");
      }
    });
  }
  

  onSelectedCsvFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const file = reader.result as string;
      this.parseCSV(file);
    };
    reader.readAsText(file);
  }

  parseCSV(data: string) {
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const imported: Student[] = [];

    for (const line of lines) {
      const [no, firstName, lastName] = line.split(',').map((s) => s.trim());
      const id = parseInt(no, 10);
      if (!id || !firstName || !lastName) {
        this.csvError = `แถวที่ไม่ถูกต้อง: "${line}"`;
        return;
      }
      imported.push({ id, firstName, lastName });
    }

    this.csvError = null;
    this.students.push(...imported);
    console.log('import data', imported);
  }
}
