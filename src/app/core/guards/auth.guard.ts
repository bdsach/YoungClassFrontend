import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly apiUrl = 'http://localhost:5271/api/identity/manage/info';

  constructor(private router: Router, private http: HttpClient) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const token = localStorage.getItem('accessToken');

    if (token) {
      return this.http
        .get(this.apiUrl)
        .pipe(
          map(() => true),
          catchError((error) => {
            if (error.status === 401) {
              // ปล่อยให้ Interceptor พา refreshToken
              console.log("call here")
              return throwError(() => error);
            } else {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              this.router.navigate(['/auth/login']);
              return of(false);
            }
          })
        );
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
