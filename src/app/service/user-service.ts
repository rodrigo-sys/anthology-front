import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { User, UserRequest, UserResponse, UserUpdateRequest } from '../interfaces/Users';

@Service()
export class UserService {
  private http=inject(HttpClient)
  private url='api/users'

  users=signal<User []>([])
  userById=signal<User | null>(null)
  error=signal<string>('')

  listUsers()
  {
    this.http.get<User[]>(this.url).subscribe(
        {
            next:(data)=>{
                this.users.set(data)
            },
            error:()=>{
                this.error.set('no se pudo mostrar la lista de usuarios')
            
        }
        }
        
    )


  }

  getById(id:number)
  {
    this.http.get<UserResponse>(`${this.url}/${id}`).subscribe(
        {
            next:(data)=>{
                this.userById.set(data)
            },
            error:()=>
            {
                this.error.set('no se pudo encontrar el usuario')
            }
        }
    )
  }

  add(request:UserRequest)
  {
    this.http.post<User>(this.url,request).subscribe(
        {
            next:() =>{
                this.listUsers()
            }
              
        }
    )
  
  }
  
  update(id:number, cambios:Partial<UserUpdateRequest>)
  {
    this.http.patch<User>(`${this.url}/${id}`,cambios).subscribe(
        {
            next:()=>{
                this.listUsers()
            },
            error:()=>{
                this.error.set('no se pudo actualizar el usuario')
            }
        }
    )
  }

  remove(id:number)
  {
    this.http.delete(`${this.url}/${id}`).subscribe(
        {
            next:()=>{
                this.listUsers()
            },
            error:()=>{
                this.error.set('no se pudo eliminar el usuario')
            }
    
        }
    )
  }

  
}
