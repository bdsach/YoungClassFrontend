import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  private readonly refreshUrl = 'http://localhost:5271/api/identity/refresh';

  constructor(private http: HttpClient) {}

  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) return null;

    try {
      const response = await lastValueFrom(
        this.http.post<{ accessToken: string; refreshToken: string }>(
          this.refreshUrl,
          {
            refreshToken,
          },
        ),
      );

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      return response.accessToken;
    } catch (error) {
      return null;
    }
  }
}
