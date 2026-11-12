import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Artist, ArtistRequest, ArtistUpdateRequest } from '../interfaces/Artists';

@Service()
export class ArtistService {

    private http=inject(HttpClient)
    private url='/api/artists'


      artists=signal<Artist []>([])
  artistById=signal<Artist| null>(null)
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
            },
            error:()=>{
                this.error.set('no se pudo actualizar el usuario')
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
