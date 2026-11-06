import { Component, inject, input, OnInit } from '@angular/core';
import { INSTRUMENT_LABEL } from '../../interfaces/Enums';
import { SongVersion } from '../../interfaces/SongVersion';
import { SongVersionService } from '../../service/song-version-service';

@Component({
  selector: 'app-version-list',
  imports: [],
  templateUrl: './version-list.html',
})
export class VersionList implements OnInit {
  songId = input.required<number>()

  versionService = inject(SongVersionService)

  etiquetas = INSTRUMENT_LABEL

  ngOnInit(): void {
    this.versionService.listVersions(this.songId())
  }

  cambiarVista(todas: boolean) {
    if (todas) this.versionService.listTodas(this.songId())
    else this.versionService.listVersions(this.songId())
  }

  aprobar(version: SongVersion) {
    this.versionService.updateStatus(this.songId(), version.id, 'APPROVED')
  }

  rechazar(version: SongVersion) {
    this.versionService.updateStatus(this.songId(), version.id, 'REJECTED')
  }

  eliminar(id: number) {
    this.versionService.remove(this.songId(), id)
  }
}
