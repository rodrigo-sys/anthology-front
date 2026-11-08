import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../../service/playlist-service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.html',
  styleUrl: './playlist-detail.css'
})
export class PlaylistDetail implements OnInit {
  private route = inject(ActivatedRoute);
  playlistService = inject(PlaylistService);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.playlistService.getPlaylistById(id);
    }
  }
}
