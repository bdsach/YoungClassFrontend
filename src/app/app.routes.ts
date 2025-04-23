import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardLayoutComponent } from './shared/components/layout/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './shared/components/layout/auth-layout/auth-layout.component';
import { ClassroomsComponent } from './features/classrooms/classrooms.component';
import { ClassroomComponent } from './features/classroom/classroom.component';
import { AttendanceComponent } from './features/classroom/attendance/attendance.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'classrooms',
        component: ClassroomsComponent,
      },
      {
        path: 'classroom/:id',
        component: ClassroomComponent,
      },
      {
        path: 'classroom/:id/attendance',
        component: AttendanceComponent,
      },
      {
        path: 'classroom/:id/timer',
        component: AttendanceComponent,
      },
      {
        path: 'classroom',
        redirectTo: 'classrooms',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
