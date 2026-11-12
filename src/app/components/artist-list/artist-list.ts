import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArtistService } from '../../service/artist-service';
import { Artist } from '../../interfaces/Artists';
import { ArtistEdit } from '../artist-edit/artist-edit';

@Component({
  imports: [FormsModule, ArtistEdit],
  selector: 'app-artist-list',
  styleUrl: './artist-list.css',
  templateUrl: './artist-list.html',
})
export class ArtistList implements OnInit {
  artistService = inject(ArtistService);
  searchId: number = 0;

  ngOnInit(): void {
    this.artistService.listArtists();
  }

  buscar() {
    this.artistService.getById(this.searchId);
  }

  editar(artist: Artist) {
    this.artistService.artistToEdit.set(artist);
  }

  eliminar(id: number) {
    this.artistService.remove(id);
  }
}

