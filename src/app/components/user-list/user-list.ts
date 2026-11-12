import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user-service';
import { User } from '../../interfaces/Users';
import { UserEdit } from '../user-edit/user-edit';

@Component({
  imports: [FormsModule, UserEdit],
  selector: 'app-user-list',
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  userService=inject(UserService)
  searchId: number=0

  ngOnInit(): void {
    this.userService.listUsers()
  }
  buscar(){
    this.userService.getById(this.searchId)
  }

  editar(user:User)
  {
    this.userService.userToEdit.set(user)
  }
  eliminar(user:User){
    const confirmado = confirm(`¿Seguro que querés eliminar al usuario "${user.username}"?`)
    if (!confirmado) return

    this.userService.remove(user.id)
  }
}
