import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, CommentRequest } from '../../service/comment-service';

@Component({
  selector: 'app-comment-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.css'
})
export class CommentCreate {
  commentService = inject(CommentService);
  content = '';
  songVersionId: number = 1;
  idUser: number = Number(typeof localStorage !== 'undefined' ? localStorage.getItem('userId') || '1' : '1');

  createComment() {
    if (!this.content) return;
    const request: CommentRequest = {
      idUser: this.idUser,
      SongVersion: this.songVersionId,
      content: this.content
    };
    this.commentService.add(request, this.songVersionId);
    this.content = '';
  }
}
