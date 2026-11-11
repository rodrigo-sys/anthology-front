import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-edit',
  styleUrl: './user-edit.css',
  templateUrl: './user-edit.html',
})
export class UserEdit {
  private fb = inject(FormBuilder);

  userService = inject(UserService);

  formulario = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const user = this.userService.userToEdit();
      if (user) {
        this.formulario.patchValue({
          username: user.username,
          email: user.email,
          password: user.password ?? '',
        });
      }
    });
  }

  save() {
    if (this.formulario.invalid) return;

    const user = this.userService.userToEdit();
    if (!user) return;

    const { username, email, password } = this.formulario.getRawValue();

    this.userService.update(user.id, { username, email, password });
    this.userService.userToEdit.set(null);
  }

  cancelar() {
    this.userService.userToEdit.set(null);
  }
}
