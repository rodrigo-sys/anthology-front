import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlbumService } from '../../service/album-service';

@Component({
  selector: 'app-album-create',
  imports: [ReactiveFormsModule],
  templateUrl: './album-create.html',
})
export class AlbumCreate {
  albumService = inject(AlbumService)
  fb = inject(FormBuilder)

  private anioActual = new Date().getFullYear()

  formulario = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    artistName: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    releaseYear: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1900),
      Validators.max(this.anioActual),
    ]),
  })

  add() {
    if (this.formulario.invalid) return

    const { title, artistName, releaseYear } = this.formulario.getRawValue()

    this.albumService.add({ title, artistName, releaseYear: releaseYear! })

    this.formulario.reset()
  }
}
