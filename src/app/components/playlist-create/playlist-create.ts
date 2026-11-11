import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistService } from '../../service/playlist-service';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-playlist-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './playlist-create.html',
  styleUrl: './playlist-create.css'
})
export class PlaylistCreate {
  private fb = inject(FormBuilder);
  private playlistService = inject(PlaylistService);
  private authService = inject(AuthService);
  playlistForm: FormGroup;

  constructor() {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.playlistForm.invalid) { return }

    const userId = this.authService.getUserId();
    if (!userId) { return }

    const request = {
      name: this.playlistForm.value.name,
      idUser: userId
    };

    this.playlistService.createPlaylist(request);
    this.playlistForm.reset();
  }
}
