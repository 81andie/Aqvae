import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.setLanguage('en');
  }


  setLanguage(language:string):void{
    this.translate.use(language);
  }

  getLanguage(): string {
    return this.translate.currentLang || 'en'; 
  }


}
