import { Component, OnInit, inject } from '@angular/core';
import { ArtistEdit } from '../../components/artist-edit/artist-edit';
import { ArtistService } from '../../service/artist-service';

@Component({
  selector: 'app-artist-profile-page',
  imports: [ArtistEdit],
  templateUrl: './artist-profile.html',
  styleUrl: './artist-profile.css'
})
export class ArtistProfilePage implements OnInit {
  artistService = inject(ArtistService);

  ngOnInit(): void {
    this.artistService.getMine().subscribe();
  }
}
