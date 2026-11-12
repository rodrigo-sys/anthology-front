import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistService } from '../../service/artist-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-artist-create',
  styleUrl: './artist-create.css',
  templateUrl: './artist-create.html',
})
export class ArtistCreate {
   private fb=inject(FormBuilder)

  artistService=inject(ArtistService)

  formulario=this.fb.nonNullable.group({
    userId:[0,Validators.required],
    stageName:['',Validators.required],
    biography:['',Validators.required],
    instagram:['',Validators.required],
    spotify:['',Validators.required],
    youtube:['',Validators.required]
  })


  add() {
    if (this.formulario.invalid) return

    const { userId, stageName, biography,instagram,spotify,youtube  } = this.formulario.getRawValue()

    this.artistService.add({ userId, stageName, biography,instagram,spotify,youtube })

    this.formulario.reset()
  }
}
