import { Component, inject, input } from '@angular/core';
import { CommentResponse } from '../../interfaces/Comment';
import { CommentService } from '../../service/comment-service';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-comment-item',
  imports: [],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css'
})
export class CommentItem {
  comment = input.required<CommentResponse>();
  songVersionId = input<number>(0);
  commentService = inject(CommentService);
  authService = inject(AuthService);

  deleteComment(id: number) {
    this.commentService.remove(id, this.songVersionId());
  }
}
