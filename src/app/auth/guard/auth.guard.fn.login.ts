import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuardFnLogin = () => {
    const router = inject(Router);

    
    if(!localStorage.getItem('loggedUser')){
        return true;  
    }
    else{
        router.navigateByUrl('/access-denied-login');
        return false; 
    }
}