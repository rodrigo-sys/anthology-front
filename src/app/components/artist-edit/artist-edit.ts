import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistService } from '../../service/artist-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-artist-edit',
  styleUrl: './artist-edit.css',
  templateUrl: './artist-edit.html',
})
export class ArtistEdit {
  private fb = inject(FormBuilder);

  artistService = inject(ArtistService);

  formulario = this.fb.nonNullable.group({
    stageName: ['', Validators.required],
    biography: ['', Validators.required],
    instagram: ['', Validators.required],
    spotify: ['', Validators.required],
    youtube: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const artist = this.artistService.artistToEdit();
      if (artist) {
        this.formulario.patchValue({
          stageName: artist.stageName,
          biography: artist.biography,
          instagram: artist.instagram,
          spotify: artist.spotify,
          youtube: artist.youtube,
        });
      }
    });
  }

  save() {
    if (this.formulario.invalid) return;

    const artist = this.artistService.artistToEdit();
    if (!artist) return;

    const { biography, instagram, spotify, youtube } = this.formulario.getRawValue();

    this.artistService.update(artist.id, { biography, instagram, spotify, youtube });
    this.artistService.artistToEdit.set(null);
  }

  cancelar() {
    this.artistService.artistToEdit.set(null);
  }
}

