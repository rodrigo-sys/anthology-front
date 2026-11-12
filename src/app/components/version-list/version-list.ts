import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { INSTRUMENT_LABEL, STATUS_LABEL, Status } from '../../interfaces/Enums';
import { SongVersion } from '../../interfaces/SongVersion';
import { AuthService } from '../../service/auth-service';
import { SongVersionService } from '../../service/song-version-service';

@Component({
  selector: 'app-version-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './version-list.html',
  styleUrl: './version-list.css'
})
export class VersionList implements OnInit {
  songId = input.required<number>()

  versionService = inject(SongVersionService)
  authService = inject(AuthService)

  esAdmin = this.authService.isAdmin()

  etiquetas = INSTRUMENT_LABEL
  estadoEtiquetas = STATUS_LABEL
  estados: Status[] = ['PENDING', 'APPROVED', 'REJECTED']

  filtroEstado: Status | '' = ''
  mostrandoMias = false

  ngOnInit(): void {
    this.versionService.listVersions(this.songId())
  }

  versionsFiltradas(): SongVersion[] {
    const estado = this.filtroEstado
    if (!estado) return this.versionService.versions()

    return this.versionService.versions().filter((version) => version.status === estado)
  }

  cambiarVista(todas: boolean) {
    this.mostrandoMias = false
    if (todas) this.versionService.listTodas(this.songId())
    else this.versionService.listVersions(this.songId())
  }

  verMias() {
    this.filtroEstado = ''
    this.mostrandoMias = true
    this.versionService.myVersions(this.songId())
  }

  aprobar(version: SongVersion) {
    this.versionService.updateStatus(this.songId(), version.id, 'APPROVED')
  }

  rechazar(version: SongVersion) {
    this.versionService.updateStatus(this.songId(), version.id, 'REJECTED')
  }

  eliminar(version: SongVersion) {
    if (!confirm('¿Eliminar esta versión?')) return

    this.versionService.remove(this.songId(), version.id)
  }
}
