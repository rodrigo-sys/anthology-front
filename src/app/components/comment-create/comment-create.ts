import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment-service';
import { CommentRequest } from '../../interfaces/Comment';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-comment-create',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.css'
})
export class CommentCreate {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  commentService = inject(CommentService);
  songVersionId = input.required<number>();

  commentForm: FormGroup = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]
  });

  createComment() {
    if (this.commentForm.invalid) return;

    const sId = this.songVersionId();
    const request: CommentRequest = {
      SongVersion: sId,
      content: this.commentForm.value.content
    } as CommentRequest;
    this.commentService.add(request, sId);
    this.commentForm.reset();
  }
}
