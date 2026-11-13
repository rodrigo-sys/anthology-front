import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-artist-page',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.css'
})
export class ArtistPage {}