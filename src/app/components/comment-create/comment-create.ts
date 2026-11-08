import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../service/comment-service';
import { CommentRequest } from '../../interfaces/Comment';

@Component({
  selector: 'app-comment-create',
  imports: [FormsModule],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.css'
})
export class CommentCreate {
  commentService = inject(CommentService);
  songVersionId = input.required<number>();
  content = '';
  idUser: number = Number(typeof localStorage !== 'undefined' ? localStorage.getItem('userId') : 0);

  createComment() {
    if (!this.content || !this.idUser) return;
    const sId = this.songVersionId();
    const request: CommentRequest = {
      idUser: this.idUser,
      SongVersion: sId,
      content: this.content
    };
    this.commentService.add(request, sId);
    this.content = '';
  }
}
