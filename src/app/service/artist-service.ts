import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable, of, map, tap, catchError } from 'rxjs';
import { Artist, ArtistRequest, ArtistUpdateRequest } from '../interfaces/Artists';
import { AuthService } from './auth-service';

@Service()
export class ArtistService {

    private http=inject(HttpClient)
    private authService=inject(AuthService)
    private url='/api/artists'


      artists=signal<Artist []>([])
  artistById=signal<Artist| null>(null)
  artistToEdit=signal<Artist | null>(null)
  error=signal<string>('')

  listArtists()
  {
    this.http.get<Artist[]>(this.url).subscribe(
        {
            next:(data)=>{
                this.artists.set(data)
            },
            error:()=>{
                this.error.set('no se pudo mostrar la lista de artistas')
            
        }
        }
        
    )


  }

  getById(id:number)
  {
    this.http.get<Artist>(`${this.url}/${id}`).subscribe(
        {
            next:(data)=>{
                this.artistById.set(data)
            },
            error:()=>
            {
                this.error.set('no se pudo encontrar el usuario')
            }
        }
    )
  }

  add(request:ArtistRequest)
  {
    this.http.post<Artist>(this.url,request).subscribe(
        {
            next:() =>{
                this.listArtists()
            }
              
        }
    )
  
  }
  
  update(id:number, cambios:Partial<ArtistUpdateRequest>)
  {
    this.http.put<Artist>(`${this.url}/${id}`,cambios).subscribe(
        {
            next:()=>{
                this.listArtists()
                this.artistToEdit.set(null)
            },
            error:()=>{
                this.error.set('no se pudo actualizar el usuario')
            }
        }
    )
  }

  save(id:number, cambios:Partial<ArtistUpdateRequest>)
  {
    if (this.authService.isAdmin()) {
      this.update(id, cambios)
    } else {
      this.updateMine(cambios)
    }
  }

  getMine(): Observable<Artist | null>
  {
    const userId = this.authService.getUserId();
    return this.http.get<Artist[]>(this.url).pipe(
        map((artists) => artists.find((artist) => artist.userId === userId) ?? null),
        tap((artist) => {
            if (artist) {
                this.artistToEdit.set(artist);
            } else {
                this.error.set('no se encontró tu perfil de artista');
            }
        }),
        catchError(() => {
            this.error.set('no se pudo cargar tu perfil de artista');
            return of(null);
        })
    )
  }

  updateMine(cambios: Partial<ArtistUpdateRequest>)
  {
    this.http.put<Artist>(`${this.url}/artist`, cambios).subscribe(
        {
            next:()=>{
                this.listArtists()
            },
            error:()=>{
                this.error.set('no se pudo actualizar tu perfil de artista')
            }
        }
    )
  }

  remove(id:number)
  {
    this.http.delete<void>(`${this.url}/${id}`).subscribe(
        {
            next:()=>{
                this.listArtists()
            },
            error:()=>{
                this.error.set('no se pudo eliminar el usuario')
            }
    
        }
    )
  }
}
