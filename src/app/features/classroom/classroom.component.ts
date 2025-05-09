import { Title } from '@angular/platform-browser';
import { Student } from '@shared/models/Student';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImportStudentDialogComponent } from './import-student-dialog/import-student-dialog.component';
import { Component, inject, input, OnInit } from '@angular/core';

const STUDENTS_DATA: Student[] = [
  { id: 1, firstName: 'สมชาย', lastName: 'ทองดี' },
  { id: 2, firstName: 'ศิริพร', lastName: 'แสงจันทร์' },
  { id: 3, firstName: 'ประยุทธ์', lastName: 'คนดีศรีสุข' },
  { id: 4, firstName: 'ปวีณา', lastName: 'ใจงาม' },
  { id: 5, firstName: 'วราวุธ', lastName: 'ศรีสุข' },
  { id: 6, firstName: 'อรอนงค์', lastName: 'พูนผล' },
  { id: 7, firstName: 'สมปอง', lastName: 'นาควิไล' },
  { id: 8, firstName: 'ณัฐพล', lastName: 'วัฒนชัย' },
  { id: 9, firstName: 'ธนภร', lastName: 'มีสุข' },
  { id: 10, firstName: 'จิราพร', lastName: 'ทรัพย์เจริญ' },
  { id: 11, firstName: 'ณัฐชา', lastName: 'วงศ์วิไล' },
  { id: 12, firstName: 'ชาญชัย', lastName: 'ตั้งมั่น' },
  { id: 13, firstName: 'สุชาติ', lastName: 'สืบสาย' },
  { id: 14, firstName: 'พิมพ์ชนก', lastName: 'แสงรุ่ง' },
  { id: 15, firstName: 'ศักดิ์ดา', lastName: 'ทองแท้' },
  { id: 16, firstName: 'รุ่งนภา', lastName: 'สุขดี' },
  { id: 17, firstName: 'ธีรศักดิ์', lastName: 'กำแหง' },
  { id: 18, firstName: 'วรรณา', lastName: 'ปรีชารัตน์' },
  { id: 19, firstName: 'นพพร', lastName: 'จันทรา' },
  { id: 20, firstName: 'สุรีย์พร', lastName: 'สายใจ' },
];

@Component({
  selector: 'app-classroom',
  imports: [RouterModule, MatTableModule, MatTabsModule],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss',
})
export class ClassroomComponent implements OnInit {
  readonly id = input<string>();
  readonly dialog = inject(MatDialog);


  students: Student[] = STUDENTS_DATA;
  totalGroup: number = 3;

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.id()}`);
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
