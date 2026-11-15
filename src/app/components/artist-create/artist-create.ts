import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistService } from '../../service/artist-service';
import { UserService } from '../../service/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-artist-create',
  styleUrl: './artist-create.css',
  templateUrl: './artist-create.html',
})
export class ArtistCreate implements OnInit {
  private fb = inject(FormBuilder)

  artistService = inject(ArtistService)
  userService = inject(UserService)

  guardando = signal(false)
  mensaje = signal('')
  error = signal('')

  usuariosDisponibles = computed(() => {
    const yaSonArtistas = new Set(this.artistService.artists().map((artist) => artist.userId))
    return this.userService.users().filter((user) => !yaSonArtistas.has(user.id))
  })

  formulario = this.fb.nonNullable.group({
    userId: [0, [Validators.required, Validators.min(1)]],
    stageName: ['', Validators.required],
    biography: ['', Validators.required],
    instagram: [''],
    spotify: [''],
    youtube: ['']
  })

  ngOnInit() {
    this.userService.listUsers()
    this.artistService.listArtists()
  }

  add() {
    if (this.formulario.invalid || this.guardando()) return

    const { userId, stageName, biography, instagram, spotify, youtube } = this.formulario.getRawValue()
    const usuario = this.userService.users().find((user) => user.id === userId)

    this.guardando.set(true)
    this.mensaje.set('')
    this.error.set('')

    this.artistService.add({ userId, stageName, biography, instagram, spotify, youtube }).subscribe({
      next: () => {
        this.guardando.set(false)
        this.mensaje.set(`Listo: ${usuario?.username ?? 'el usuario'} ya es artista. Para que vea las funciones de artista, tiene que cerrar sesión y volver a iniciar sesión.`)
        this.formulario.reset({ userId: 0, stageName: '', biography: '', instagram: '', spotify: '', youtube: '' })
      },
      error: () => {
        this.guardando.set(false)
        this.error.set(this.artistService.error() || 'No se pudo asignar el rol de artista.')
      }
    })
  }
}
