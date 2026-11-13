import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuggestionService } from '../../service/suggestion-service';
import { SongSuggestionRequest } from '../../interfaces/Suggestion';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-suggestion-create',
  imports: [ReactiveFormsModule],
  templateUrl: './suggestion-create.html',
  styleUrl: './suggestion-create.css'
})
export class SuggestionCreate {
  private fb = inject(FormBuilder);
  suggestionService = inject(SuggestionService);
  authService = inject(AuthService)

  suggestionForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    artistName: ['', [Validators.required, Validators.maxLength(255)]],
    notes: ['', [Validators.required, Validators.maxLength(500)]]
  });

  createSuggestion() {
    if (this.suggestionForm.invalid) return;

    const request: SongSuggestionRequest = {
      ...this.suggestionForm.getRawValue()
    } as SongSuggestionRequest;

    this.suggestionService.create(request);
    this.suggestionForm.reset();
  }
}
