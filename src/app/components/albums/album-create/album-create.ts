import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Album } from '../../../interfaces/Album';
import { AlbumService } from '../../../service/album-service';

@Component({
  selector: 'app-album-create',
  imports: [ReactiveFormsModule],
  templateUrl: './album-create.html',
  styleUrl: './album-create.css'
})
export class AlbumCreate {
  albumService = inject(AlbumService)
  fb = inject(FormBuilder)

  creado = output<Album>()

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

    this.albumService.add({ title, artistName, releaseYear: releaseYear! }, (album) => {
      this.formulario.reset()
      this.creado.emit(album)
    })
  }
}
