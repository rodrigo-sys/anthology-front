import { Component, inject } from '@angular/core';
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
}
