import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-info-conciencia',
  standalone: true,
  imports: [ TranslateModule],
  templateUrl: './info-conciencia.component.html',
  styleUrl: './info-conciencia.component.css'
})
export class InfoConcienciaComponent {

}
