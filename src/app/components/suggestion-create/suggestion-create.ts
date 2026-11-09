import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuggestionService } from '../../service/suggestion-service';
import { SongSuggestionRequest } from '../../interfaces/Suggestion';

@Component({
  selector: 'app-suggestion-create',
  imports: [ReactiveFormsModule],
  templateUrl: './suggestion-create.html',
  styleUrl: './suggestion-create.css'
})
export class SuggestionCreate {
  private fb = inject(FormBuilder);
  suggestionService = inject(SuggestionService);

  suggestionForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    artistName: ['', [Validators.required, Validators.maxLength(255)]],
    genre: ['', [Validators.required, Validators.maxLength(100)]]
  });

  createSuggestion() {
    if (this.suggestionForm.invalid) return;
    const request: SongSuggestionRequest = this.suggestionForm.getRawValue();
    this.suggestionService.create(request);
    this.suggestionForm.reset();
  }
}
