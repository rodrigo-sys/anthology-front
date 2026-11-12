import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css'
})
export class AdminPage {}
