import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

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
        .get(this.apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .pipe(
          map(() => true),
          catchError(() => {
            this.router.navigate(['/login']);
            return of(false);
          })
        );
    }

    this.router.navigate(['/login']);
    return false;
  }
}
