import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { MapComponent } from "./components/map/map.component";
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SelectorsComponent } from "./components/selectors/selectors.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    MapComponent,
    SidenavComponent,
    SelectorsComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aqvae';
}
