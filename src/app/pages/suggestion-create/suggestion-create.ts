import { Component } from '@angular/core';
import { SuggestionCreate } from '../../components/suggestion-create/suggestion-create';

@Component({
  selector: 'app-suggestion-create-page',
  imports: [SuggestionCreate],
  templateUrl: './suggestion-create.html',
  styleUrl: './suggestion-create.css'
})
export class SuggestionCreatePage {}
