import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtistService } from '../../service/artist-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-artist-edit',
  styleUrl: './artist-edit.css',
  templateUrl: './artist-edit.html',
})
export class ArtistEdit {
  private fb=inject(FormBuilder)

  artistService=inject(ArtistService)

   formulario=this.fb.nonNullable.group({
  
    stageName:['',Validators.required],
    biography:['',Validators.required],
    instagram:['',Validators.required],
    spotify:['',Validators.required],
    youtube:['',Validators.required]
  })
 
  private artist=this.artistService.artistById()

  ngOnInit(): void {
  
    if(this.artist)
    {
      this.formulario.patchValue(
      {
      
        stageName:this.artist.stageName,
        biography:this.artist.biography,
        instagram:this.artist.instagram,
        spotify:this.artist.spotify,
        youtube:this.artist.youtube
      
      }
    )
    }
  }
  save()
  {
    if(this.formulario.invalid)return


  
    let stageName=this.formulario.controls['stageName'].value
    let biography=this.formulario.controls['biography'].value
    let instagram=this.formulario.controls['instagram'].value
    let spotify=this.formulario.controls['spotify'].value
    let youtube=this.formulario.controls['youtube'].value

    this.artistService.update(this.artist!.id, {instagram,biography,spotify,youtube})
    this.artistService.artistById.set(null)
  }
cancelar()
{
 this.artistService.artistById.set(null)
}
}

