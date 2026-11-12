import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommentResponse } from '../../interfaces/Comment';
import { CommentService } from '../../service/comment-service';
import { AuthService } from '../../service/auth-service';
import { INSTRUMENT_LABEL } from '../../interfaces/Enums';

@Component({
  selector: 'app-comment-item',
  imports: [DatePipe],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.css'
})
export class CommentItem {
  comment = input.required<CommentResponse>();
  songVersionId = input<number>(0);
  commentService = inject(CommentService);
  authService = inject(AuthService);
  etiquetas = INSTRUMENT_LABEL;

  deleteComment(id: number) {
    this.commentService.remove(id, this.songVersionId());
  }
}
