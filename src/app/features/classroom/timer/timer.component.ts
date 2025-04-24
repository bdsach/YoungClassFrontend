import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from 'ngx-countdown';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [CommonModule, FormsModule, CountdownComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {}
