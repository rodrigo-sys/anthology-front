import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlbumService } from '../../../service/album-service';

@Component({
  selector: 'app-album-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './album-edit.html',
  styleUrl: './album-edit.css'
})
export class AlbumEdit implements OnInit {
  albumService = inject(AlbumService)
  fb = inject(FormBuilder)

  private album = this.albumService.albumSeleccionado()

  formulario = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    artistName: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    releaseYear: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear()),
    ]),
  })

  ngOnInit(): void {
    if (this.album) {
      this.formulario.patchValue({
        title: this.album.title,
        artistName: this.album.artistName,
        releaseYear: this.album.releaseYear,
      })
    }
  }

  guardar() {
    if (this.formulario.invalid || !this.album) return

    const { title, artistName, releaseYear } = this.formulario.getRawValue()

    this.albumService.update(this.album.id, { title, artistName, releaseYear: releaseYear! })
  }

  cancelar() {
    this.albumService.albumSeleccionado.set(null)
  }
}
