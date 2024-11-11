import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class LanguageService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ca');
    this.setLanguage('ca');
  }


  setLanguage(language:string):void{
    this.translate.use(language);
  }

  getLanguage(): string {
    return this.translate.currentLang || 'en';
  }




}
