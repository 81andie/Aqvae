import { Component } from '@angular/core';
import { SelectorsComponent } from "../selectors/selectors.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SelectorsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
