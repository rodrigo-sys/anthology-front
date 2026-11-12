import { Component, inject, signal, computed } from '@angular/core';
import { SuggestionService } from '../../service/suggestion-service';
import { SuggestionItem } from '../suggestion-item/suggestion-item';

@Component({
  selector: 'app-suggestion-list',
  imports: [SuggestionItem],
  templateUrl: './suggestion-list.html',
  styleUrl: './suggestion-list.css'
})
export class SuggestionList {
  suggestionService = inject(SuggestionService);

  searchQuery = signal('');
  statusFilter = signal<string>('ALL');

  filteredSuggestions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.statusFilter();
    return this.suggestionService.suggestions().filter(s => {
      const matchesQuery = !query || 
        s.title.toLowerCase().includes(query) || 
        s.artistName.toLowerCase().includes(query) ||
        s.notes.toLowerCase().includes(query);
      
      const matchesStatus = status === 'ALL' || s.status === status;

      return matchesQuery && matchesStatus;
    });
  });

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.statusFilter.set(target.value);
  }
}
