import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Album } from '../../../interfaces/Album';
import { AlbumService } from '../../../service/album-service';
import { SongService } from '../../../service/song-service';
import { AlbumCreate } from '../../albums/album-create/album-create';

@Component({
  selector: 'app-song-create',
  imports: [ReactiveFormsModule, AlbumCreate],
  templateUrl: './song-create.html',
})
export class SongCreate implements OnInit {
  songService = inject(SongService)
  albumService = inject(AlbumService)
  fb = inject(FormBuilder)

  mostrarAlbum = false

  formulario = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    artistName: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    genre: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
    albumId: this.fb.control<number | null>(null, [Validators.min(1)]),
  })

  ngOnInit(): void {
    this.albumService.listAlbums()
  }

  add() {
    if (this.formulario.invalid) return

    const { title, artistName, genre, albumId } = this.formulario.getRawValue()

    this.songService.add({ title, artistName, genre, albumId }, () => {
      this.formulario.reset()
    })
  }

  albumCreado(album: Album) {
    this.formulario.controls['albumId'].setValue(album.id)
    this.mostrarAlbum = false
  }
}
