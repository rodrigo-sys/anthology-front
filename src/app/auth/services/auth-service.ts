import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService{
    private myUrl='http://localhost:3000/usersRegistered'
    
    private usersRegisteredSignal = signal<any[]>([]);
  
    public usersRegistered = this.usersRegisteredSignal.asReadonly();

  private router = inject(Router);
 
  public estoyLogeado = signal(false);

  constructor(private http: HttpClient) { 
    
    this.getUsersRegistered().subscribe(users => {
      this.usersRegisteredSignal.set(users);
    });
    
    
    const user = localStorage.getItem('loggedUser')
    if(user){
      this.estoyLogeado.set(true);
    }
  }

  getUsersRegistered(){
    return this.http.get<any[]>(this.myUrl);
  }

  checkUserExists(userLog: any): boolean {
    const users = this.usersRegisteredSignal();
    return users.some(user => 
      user.username.toLowerCase() === userLog.username.toLowerCase() && 
      user.password === userLog.password
    );
  }

  logIn(){
    this.estoyLogeado.set(true);
  }

  logOut(){
    this.router.navigateByUrl('access-denied');
    this.estoyLogeado.set(false);
    if(localStorage.getItem('loggedUser')){
      localStorage.removeItem('loggedUser');
    }
  }

}