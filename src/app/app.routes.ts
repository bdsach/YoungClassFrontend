import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { TodoComponent } from './features/todo/todo.component';
import { TodosComponent } from './features/todos/todos.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardLayoutComponent } from './shared/components/layout/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './shared/components/layout/auth-layout/auth-layout.component';

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
      { path: 'todos', component: TodosComponent },
      {
        path: 'todo/:id',
        component: TodoComponent,
      },
      {
        path: 'todo',
        redirectTo: 'todos',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
