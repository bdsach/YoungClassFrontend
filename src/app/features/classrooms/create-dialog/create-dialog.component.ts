import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CreateClassroom } from '@shared/models/Classroom';
import { ClassroomService } from '@shared/services/classroom/classroom.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-create-dialog',
  imports: [ReactiveFormsModule, MatDialogContent, MatDialogTitle],
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
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
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
