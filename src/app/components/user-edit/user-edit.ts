import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-edit',
  styleUrl: './user-edit.css',
  templateUrl: './user-edit.html',
})
export class UserEdit implements OnInit {

  private fb=inject(FormBuilder)

  userService=inject(UserService)

  formulario=this.fb.nonNullable.group({
    username:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]
  })

  private user=this.userService.userById()

  ngOnInit(): void {
  
    if(this.user)
    {
      this.formulario.patchValue(
      {
        username:this.user.username,
        email:this.user.email,
        password:this.user.password
      
      }
    )
    }
  }
  save()
  {
    if(this.formulario.invalid)return


    let username=this.formulario.controls['username'].value
    let email=this.formulario.controls['email'].value
    let password=this.formulario.controls['password'].value

    this.userService.update(this.user!.id, {username,email,password})
    this.userService.userById.set(null)
  }
cancelar()
{
  this.userService.userById.set(null)
}
}
