import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VersionCreate } from '../../components/versions/version-create/version-create';
import { VersionList } from '../../components/versions/version-list/version-list';
import { INSTRUMENT_LABEL, Instrument, STATUS_LABEL } from '../../interfaces/Enums';
import { SongService } from '../../service/song-service';

@Component({
  imports: [RouterLink, VersionList, VersionCreate],
  selector: 'app-song-detail',
  templateUrl: './song-detail.html',
  styleUrl: './song-detail.css'
})
export class SongDetail implements OnInit {
  songService = inject(SongService)
  route = inject(ActivatedRoute)

  etiquetas = INSTRUMENT_LABEL
  estadoEtiquetas = STATUS_LABEL

  id = 0

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.songService.getById(this.id)
  }

  instrumentos(instrumentos: Instrument[]): string {
    return instrumentos.map((instrumento) => this.etiquetas[instrumento]).join(', ')
  }
}
