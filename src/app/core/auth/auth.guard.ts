import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    // si hay token, dejamos pasar
    if (auth.isAuthenticated()) return true;

    // si NO hay token, redirigimos a login
    // ⚠️ solo pasamos returnUrl, NO los filtros de la URL
    return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
    });
};
