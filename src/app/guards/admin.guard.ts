// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateAdmin: CanActivateFn = () => {
    const router = inject(Router);
    const isAuthorized = localStorage.getItem('admin') === 'true';
    if (!isAuthorized) {
    router.navigate(['/kiosko']);
    return false;
    }
    return true;
};

//Esto va en el login 
//En el login de la parte administrativa, simplemente guardas ese flag con:
//localStorage.setItem('admin', 'true');