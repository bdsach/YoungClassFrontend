import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5271/api/identity/login';

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string) {
    this.http
      .post<{ accessToken: string; refreshToken: string }>(this.apiUrl, {
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);

          this.router.navigate(['/classrooms']);
        },
        error: (err) => {
          alert('Login failed. Please try again.');
        },
      });
  }
}
