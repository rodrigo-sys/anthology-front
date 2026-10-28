import { inject } from "@angular/core";
import { AuthService } from "../services/auth-service";
import { Router } from "@angular/router";

export const authGuardFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    
    if(authService.estoyLogeado() || localStorage.getItem('loggedUser')){
        return true; 
    } else {
        router.navigateByUrl('access-denied')
        return false; 
    }
}