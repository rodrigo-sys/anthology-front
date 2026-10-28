import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistResponse, PlaylistService } from '../../service/playlist-service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.html',
  styleUrl: './playlist-detail.css'
})
export class PlaylistDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private playlistService = inject(PlaylistService);

  playlist = signal<PlaylistResponse | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.playlistService.getPlaylistById(id).subscribe(playlist => {
        this.playlist.set(playlist);
      });
    }
  }
}
