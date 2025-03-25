import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  defaultEmail: string = 'teacher01@email.com';
  defaultPassword: string = 'pAssword_123';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [this.defaultEmail, [Validators.required, Validators.email]],
      password: [this.defaultPassword, Validators.required],
    });
  }

  ngOnInit(): void {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (isLoggedIn) {
      this.router.navigate(['/todos']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
