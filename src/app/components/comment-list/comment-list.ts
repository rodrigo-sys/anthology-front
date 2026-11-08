import { Component, inject, input } from '@angular/core';
import { CommentService } from '../../service/comment-service';
import { CommentItem } from '../comment-item/comment-item';

@Component({
  selector: 'app-comment-list',
  imports: [CommentItem],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css'
})
export class CommentList {
  commentService = inject(CommentService);
  songVersionId = input<number>(0);
}
