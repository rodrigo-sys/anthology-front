import { Component, inject } from '@angular/core';
import { ArtistCreate } from '../../components/artist-create/artist-create';
import { ArtistEdit } from '../../components/artist-edit/artist-edit';
import { ArtistList } from '../../components/artist-list/artist-list';
import { ArtistService } from '../../service/artist-service';

@Component({
  selector: 'app-artists-page',
  imports: [ArtistCreate, ArtistEdit, ArtistList],
  templateUrl: './artists.html',
  styleUrl: './artists.css',
})
export class ArtistsPage {
  artistService = inject(ArtistService);
}
