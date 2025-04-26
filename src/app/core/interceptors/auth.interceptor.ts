import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { RefreshTokenService } from '../../shared/services/auth/refresh-token.service';
import { catchError, from, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn =  (req, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshTokenService= inject(RefreshTokenService);
  const router = inject(Router)

  let authReq = req;

  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      console.log('Interceptor caught error:', error);
      if (error.status === 401) {
        return from(refreshTokenService.refreshToken()).pipe(
          switchMap((newAccessToken) => {
            if (newAccessToken) {
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              console.log("✅ set new token");
              return next(retryReq);
            } else {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              router.navigate(['/auth/login']);
              return throwError(() => error);
            }
          })
        );
      }

      return throwError(() => error)
    })
  )
};
