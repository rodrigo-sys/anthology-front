import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlaylistService } from '../../service/playlist-service';
import { FormsModule } from '@angular/forms';
import { INSTRUMENT_LABEL } from '../../interfaces/Enums';

@Component({
  selector: 'app-playlist-detail',
  imports: [RouterLink, FormsModule],
  templateUrl: './playlist-detail.html',
  styleUrl: './playlist-detail.css'
})
export class PlaylistDetail implements OnInit {
  private route = inject(ActivatedRoute);
  playlistService = inject(PlaylistService);
  etiquetas = INSTRUMENT_LABEL;
  songVersionIdInput: number | null = null;
  playlistId = 0;

  ngOnInit() {
    this.playlistId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.playlistId) {
      this.playlistService.getPlaylistById(this.playlistId);
    }
  }

  removeSong(songVersionId: number) {
    if (this.playlistId) {
      this.playlistService.removeSongVersion(this.playlistId, songVersionId);
    }
  }

  addSong() {
    if (this.playlistId && this.songVersionIdInput) {
      this.playlistService.addSongVersion(this.playlistId, this.songVersionIdInput);
      this.songVersionIdInput = null;
    }
  }
}
