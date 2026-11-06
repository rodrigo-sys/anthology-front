import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SongUpdateRequest } from '../../interfaces/Song';
import { SongService } from '../../service/song-service';

@Component({
  selector: 'app-song-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './song-edit.html',
})
export class SongEdit implements OnInit {
  songService = inject(SongService)
  fb = inject(FormBuilder)

  private cancion = this.songService.songSeleccionada()

  albumActual = this.cancion?.AlbumTitle

  formulario = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    artistName: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    genre: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
    albumId: this.fb.control<number | null>(null, [Validators.min(1)]),
  })

  ngOnInit(): void {
    if (this.cancion) {
      this.formulario.patchValue({
        title: this.cancion.title,
        artistName: this.cancion.artistName,
        genre: this.cancion.genre,
      })
    }
  }

  guardar() {
    if (this.formulario.invalid || !this.cancion) return

    const { title, artistName, genre, albumId } = this.formulario.getRawValue()

    const cambios: SongUpdateRequest = { title, artistName, genre }
    if (albumId !== null) cambios.albumId = albumId

    this.songService.update(this.cancion.id, cambios)
  }

  cancelar() {
    this.songService.songSeleccionada.set(null)
  }
}
