import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SongService } from '../../service/song-service';

@Component({
  selector: 'app-song-create',
  imports: [ReactiveFormsModule],
  templateUrl: './song-create.html',
})
export class SongCreate {
  songService = inject(SongService)
  fb = inject(FormBuilder)

  formulario = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    artistName: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(255)]),
    genre: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
    albumId: this.fb.control<number | null>(null, [Validators.min(1)]),
  })

  add() {
    if (this.formulario.invalid) return

    const { title, artistName, genre, albumId } = this.formulario.getRawValue()

    this.songService.add({ title, artistName, genre, albumId })

    this.formulario.reset()
  }
}
