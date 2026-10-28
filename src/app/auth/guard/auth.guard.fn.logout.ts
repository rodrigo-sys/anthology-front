import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuardFnLogout = () => {
    const router = inject(Router);

   
    if(!localStorage.getItem('loggedUser')){
        return true;  
    }
    else{
        router.navigateByUrl('home');
        return false; 
    }
}