import { Component} from '@angular/core';
import { SpeciesStoryComponent } from '../species-story/species-story.component';
import { InfoConcienciaComponent } from '../info-conciencia/info-conciencia.component';
import { InfoTipsComponent } from '../info-tips/info-tips.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';



@Component({
  selector: 'app-story',
  standalone: true,
  imports: [SpeciesStoryComponent, InfoConcienciaComponent, InfoTipsComponent, TranslateModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent  {
  translate: any;
  currentLanguage: any;
  languageService: any;

  constructor(){


  }



  }














