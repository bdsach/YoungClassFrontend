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
import { CreateStudent, Student } from '@shared/models/Student';
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
  students: CreateStudent[] = [];
  csvError: string | null = null;

  placeholders = {
    no: 'เลขที่',
    firstName: 'ชื่อ',
    lastName: 'สกุล',
  };

  constructor(
    private fb: FormBuilder,
    private classroomService: ClassroomService,
  ) {
    this.studentForm = this.fb.group({
      no: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  addStudentToList() {
    if (this.studentForm.valid) {
      const student: CreateStudent = this.studentForm.value;
      this.students.push(student);
      this.studentForm.reset();
    }
  }

  createStudent() {
    const classroomId = this.data.classroomId;
    const body = {
      classroomId,
      enrollments: this.students.map((student) => ({
        email: `${student.firstNameEn}.${student.lastNameEn.charAt(0)}@email.com`,
        userName: `${student.firstNameEn}.${student.lastNameEn.charAt(0)}`,
        studentId: student.studentId,
        firstName: student.firstNameTh,
        lastName: student.lastNameTh,
      })),
    };

    this.classroomService.bulkEnrollment(classroomId, body).subscribe({
      next: () => {
        console.log('bulk create students successfully.');
        this.dialogRef.close();
      },
      error: (err) => {
        console.log('error on bulk create students', err);
        alert('error on bulk create students');
      },
    });
  }

  onSelectedCsvFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const file = reader.result as string;
      // console.log(file)
      this.parseCSV(file);
    };
    reader.readAsText(file);
  }

  parseCSV(data: string) {
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const imported: CreateStudent[] = [];

    for (const line of lines.slice(1)) {
      // const [no, firstName, lastName] = line.split(',').map((s) => s.trim());
      console.log("line", line)
      const [
        studentId,
        firstNameTh,
        lastNameTh,
        firstNameEn,
        lastNameEn,
        email,
      ] = line.split(',').map((s) => s.trim());

      const id = parseInt(studentId, 10);
      if (!id || !firstNameTh || !lastNameTh) {
        this.csvError = `แถวที่ไม่ถูกต้อง: "${line}"`;
        return;
      }
      imported.push({
        studentId,
        email,
        firstNameTh,
        lastNameTh,
        firstNameEn,
        lastNameEn,
      });
    }

    this.csvError = null;
    this.students.push(...imported);
    console.log('import data', imported);
  }
}
