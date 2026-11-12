import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../service/comment-service';
import { CommentItem } from '../comment-item/comment-item';

@Component({
  selector: 'app-comment-list',
  imports: [CommentItem, FormsModule],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css'
})
export class CommentList {
  commentService = inject(CommentService);
  songVersionId = input<number>(0);

  usernameFilter = signal('');
  songTitleFilter = signal('');
  instrumentFilter = signal('');

  filteredComments = computed(() => {
    const username = this.usernameFilter().toLowerCase().trim();
    const songTitle = this.songTitleFilter().toLowerCase().trim();
    const instrument = this.instrumentFilter();

    return this.commentService.comments().filter(comment => {
      if (username && !comment.username.toLowerCase().includes(username)) return false;
      if (songTitle && !comment.songTitle.toLowerCase().includes(songTitle)) return false;
      if (instrument && comment.instrument !== instrument) return false;
      return true;
    });
  });

  onUsernameInput(event: Event) {
    this.usernameFilter.set((event.target as HTMLInputElement).value);
  }

  onSongTitleInput(event: Event) {
    this.songTitleFilter.set((event.target as HTMLInputElement).value);
  }

  onInstrumentChange(event: Event) {
    this.instrumentFilter.set((event.target as HTMLSelectElement).value);
  }
}
