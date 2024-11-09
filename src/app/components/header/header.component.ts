import { Component } from '@angular/core';
import { SelectorsComponent } from "../selectors/selectors.component";
import { RouterModule } from '@angular/router';
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule, LanguageSelectorComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
