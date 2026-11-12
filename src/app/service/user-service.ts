import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { User, UserRequest, UserResponse, UserUpdateRequest } from '../interfaces/Users';

@Service()
export class UserService {
  private http=inject(HttpClient)
  private url='/api/users'

  users=signal<User []>([])
  userById=signal<User | null>(null)
  userToEdit=signal<User | null>(null)
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
    this.error.set('')

    return this.http.post<User>(this.url,request).pipe(
        catchError((httpError)=>{
            this.error.set(this.mensajeError(httpError,'No se pudo crear el usuario'))
            return EMPTY
        })
    )
  
  }
  
  update(id:number, cambios:Partial<UserUpdateRequest>): Observable<UserResponse>
  {
    this.error.set('')

    return this.http.put<UserResponse>(`${this.url}/${id}`,cambios).pipe(
        tap(()=>{
            this.listUsers()
        }),
        catchError((httpError)=>{
            this.error.set(this.mensajeError(httpError,'No se pudo actualizar el usuario'))
            return EMPTY
        })
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

  private mensajeError(httpError:any, porDefecto:string)
  {
    const mensaje = httpError?.error?.message
    if (mensaje) return mensaje
    if (httpError?.status === 409) return 'Ese usuario o email ya existe.'
    if (httpError?.status === 401) return 'Tu sesión venció. Iniciá sesión otra vez.'
    return porDefecto
  }

  
}
