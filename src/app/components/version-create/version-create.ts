import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { INSTRUMENTS, INSTRUMENT_LABEL, Instrument } from '../../interfaces/Enums';
import { SongVersionService } from '../../service/song-version-service';

@Component({
  selector: 'app-version-create',
  imports: [ReactiveFormsModule],
  templateUrl: './version-create.html',
})
export class VersionCreate {
  songId = input.required<number>()

  versionService = inject(SongVersionService)
  fb = inject(FormBuilder)

  instrumentos = INSTRUMENTS
  etiquetas = INSTRUMENT_LABEL

  archivo: File | null = null

  formulario = this.fb.group({
    instrument: this.fb.control<Instrument | null>(null, [Validators.required]),
  })

  seleccionarArchivo(event: Event) {
    const input = event.target as HTMLInputElement
    this.archivo = input.files?.[0] ?? null
  }

  add(archivoInput: HTMLInputElement) {
    if (this.formulario.invalid || !this.archivo) return

    const instrument = this.formulario.getRawValue().instrument!
    const archivo = this.archivo

    this.versionService.add(this.songId(), instrument, archivo, () => {
      this.archivo = null
      archivoInput.value = ''
      this.formulario.reset()
    })
  }
}
