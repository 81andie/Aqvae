import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ca', name: 'Catalá' },
  ]

  currentLanguage: string;

  constructor(private languageService: LanguageService) {
    // Establecer el idioma actual
    this.currentLanguage = this.languageService.getLanguage(); // Obtiene el idioma actual
  }

  // Cambiar idioma
  switchLanguage(language: string): void {
    this.languageService.setLanguage(language);
    this.currentLanguage = language;
  }
}
