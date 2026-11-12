import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuggestionService } from '../../service/suggestion-service';
import { SuggestionItem } from '../suggestion-item/suggestion-item';

@Component({
  selector: 'app-suggestion-list',
  imports: [SuggestionItem, FormsModule],
  templateUrl: './suggestion-list.html',
  styleUrl: './suggestion-list.css'
})
export class SuggestionList {
  suggestionService = inject(SuggestionService);
  searchQuery = signal('');
  titleFilter = signal('');
  artistFilter = signal('');
  statusFilter = signal<string>('ALL');

  filteredSuggestions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const title = this.titleFilter().toLowerCase().trim();
    const artist = this.artistFilter().toLowerCase().trim();
    const status = this.statusFilter();

    return this.suggestionService.suggestions().filter(s => {
      const matchesQuery = !query ||
        s.title.toLowerCase().includes(query) ||
        s.artistName.toLowerCase().includes(query) ||
        s.notes.toLowerCase().includes(query);
      const matchesTitle = !title || s.title.toLowerCase().includes(title);
      const matchesArtist = !artist || s.artistName.toLowerCase().includes(artist);
      const matchesStatus = status === 'ALL' || s.status === status;

      return matchesQuery && matchesTitle && matchesArtist && matchesStatus;
    });
  });

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onTitleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.titleFilter.set(target.value);
  }

  onArtistInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.artistFilter.set(target.value);
  }

  onStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.statusFilter.set(target.value);
  }
}