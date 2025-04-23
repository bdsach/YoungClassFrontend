import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

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
  imports: [RouterModule, MatTableModule],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss',
})
export class ClassroomComponent {
  readonly id = input<string>();
  readonly dialog = inject(MatDialog);

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
      autoFocus: false
    });
  }

  displayedColumns: string[] = ['No', 'FirstName', 'LastName'];
  dataSource = STUDENTS_DATA;
  students = STUDENTS_DATA;
}
