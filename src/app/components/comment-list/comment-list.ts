import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../service/comment-service';
import { DevAuthService } from '../../service/dev-auth.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css'
})
export class CommentList {
  commentService = inject(CommentService);
  devAuth = inject(DevAuthService);

  deleteComment(id: number) {
    this.commentService.remove(id, 1);
  }
}
