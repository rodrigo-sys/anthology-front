import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../service/comment-service';
import { CommentList } from '../../components/comment-list/comment-list';
import { CommentCreate } from '../../components/comment-create/comment-create';

@Component({
  selector: 'app-comments-page',
  imports: [CommentList, CommentCreate],
  templateUrl: './comments.html',
  styleUrl: './comments.css'
})
export class CommentsPage implements OnInit {
  private route = inject(ActivatedRoute);
  commentService = inject(CommentService);
  songVersionId = signal<number>(0);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('songVersionId') || this.route.snapshot.paramMap.get('id');
    if (id) {
      const parsedId = Number(id);
      this.songVersionId.set(parsedId);
      this.commentService.getBySongVersionId(parsedId);
    } else {
      this.commentService.listComments();
    }
  }
}
