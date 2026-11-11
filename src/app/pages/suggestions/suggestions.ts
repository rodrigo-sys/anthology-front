import { Component, OnInit, inject } from '@angular/core';
import { SuggestionService } from '../../service/suggestion-service';
import { SuggestionList } from '../../components/suggestion-list/suggestion-list';

@Component({
  selector: 'app-suggestions-page',
  imports: [SuggestionList],
  templateUrl: './suggestions.html',
  styleUrl: './suggestions.css'
})
export class SuggestionsPage implements OnInit {
  suggestionService = inject(SuggestionService);

  ngOnInit() {
    this.suggestionService.listSuggestions();
  }
}
