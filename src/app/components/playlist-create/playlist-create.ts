import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistService } from '../../service/playlist-service';

@Component({
  selector: 'app-playlist-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './playlist-create.html',
  styleUrl: './playlist-create.css'
})
export class PlaylistCreate {
  playlistCreated = output<void>();
  private fb = inject(FormBuilder);
  private playlistService = inject(PlaylistService);
  playlistForm: FormGroup;

  constructor() {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.playlistForm.invalid) { return }

    // todo: usar id de usuario logueado
    const userId = 1;

    const request = {
      name: this.playlistForm.value.name,
      idUser: userId
    };

    this.playlistService.createPlaylist(request).subscribe(() => {
      this.playlistForm.reset();
      this.playlistCreated.emit();
    });

  }
}
