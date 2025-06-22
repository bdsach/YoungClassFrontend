import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CreateClassroom } from '@shared/models/Classroom';
import { ClassroomService } from '@shared/services/classroom/classroom.service';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss',
})
export class CreateDialogComponent {
  classroomForm: FormGroup;
  @Output() classroomCreated = new EventEmitter<void>();

  constructor(
    private classroomService: ClassroomService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDialogComponent>,
  ) {
    this.classroomForm = this.fb.group({
      subject: ['', Validators.required],
      gradeLevel: ['', Validators.required],
      room: ['', Validators.required],
      subjectGroup: ['', Validators.required]
      // description: ['', Validators.required],
    });
  }

  onSubmitCreate() {
    if (this.classroomForm.valid) {
      const newClassroom: CreateClassroom = this.classroomForm.value;
      console.log('classroom', newClassroom);
      this.classroomService.createClassroom(newClassroom).subscribe({
        next: (res) => {
          console.log('create classroom successfully.', res);
          this.classroomForm.reset();
          this.classroomCreated.emit();
          this.dialogRef.close();
        },
        error: (err) => {
          console.log('Error on create classroom.', err);
        },
      });
    }
  }
}
