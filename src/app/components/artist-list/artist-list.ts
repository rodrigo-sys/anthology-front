import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArtistService } from '../../service/artist-service';
import { Artist } from '../../interfaces/Artists';

@Component({
  imports: [FormsModule],
  selector: 'app-artist-list',
  styleUrl: './artist-list.css',
  templateUrl: './artist-list.html',
})
export class ArtistList {
  artistService=inject(ArtistService)
  searchId: number=0

  ngOnInit(): void {
    this.artistService.listArtists()
  }
  buscar(){
    this.artistService.getById(this.searchId)
  }

  editar(artist:Artist)
  {
    this.artistService.artistById.set(artist)

  }
  eliminar(id:number){
   this.artistService.remove(id)
  }
}

