import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  form = this.fb.group({
    username: [(''), [Validators.required]],
    password: [(''), [Validators.required]]
  }) 

  loginUser(){
   
    if(this.form.invalid || !this.authService.checkUserExists(this.form.value)){ 
      return;
    }
    
    console.log("Formulario validado:", this.form.value);
    
    
    localStorage.setItem('loggedUser', JSON.stringify(this.form.value));
    
   
    this.router.navigateByUrl('admin');
    
    
    this.authService.logIn();
    console.log(this.authService.estoyLogeado());
  }
}