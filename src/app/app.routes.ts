import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { TodoComponent } from './features/todo/todo.component';
import { TodosComponent } from './features/todos/todos.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todo/:id',
    component: TodoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todo',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
