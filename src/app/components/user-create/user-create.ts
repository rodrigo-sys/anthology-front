import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-create',
  styleUrl: './user-create.css',
  templateUrl: './user-create.html',
})
export class UserCreate {

  private fb=inject(FormBuilder)

  userService=inject(UserService)

  formulario=this.fb.nonNullable.group({
    username:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(4)]]
  })


  add() {
    if (this.formulario.invalid) return

    const { username, email, password  } = this.formulario.getRawValue()

    this.userService.add({ username, email, password }).subscribe({
      next: () => {
        this.formulario.reset()
      }
    })
  }
}

