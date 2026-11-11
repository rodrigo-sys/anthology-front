import { Component, inject, input } from '@angular/core';
import { SongSuggestionResponse } from '../../interfaces/Suggestion';
import { SuggestionService } from '../../service/suggestion-service';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-suggestion-item',
  imports: [],
  templateUrl: './suggestion-item.html',
  styleUrl: './suggestion-item.css'
})
export class SuggestionItem {
  suggestion = input.required<SongSuggestionResponse>();
  suggestionService = inject(SuggestionService);
  authService = inject(AuthService);

  reject(id: number) {
    this.suggestionService.reject(id);
  }

  approve(id: number) {
    this.suggestionService.addSuggestion(id);
  }

  delete(id: number) {
    this.suggestionService.remove(id);
  }
}
