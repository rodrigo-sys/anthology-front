import { Component, inject } from '@angular/core';
import { UserCreate } from '../../components/user-create/user-create';
import { UserEdit } from '../../components/user-edit/user-edit';
import { UserList } from '../../components/user-list/user-list';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-users',
  imports: [UserCreate, UserEdit, UserList],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UsersPage {
  userService = inject(UserService);
}
