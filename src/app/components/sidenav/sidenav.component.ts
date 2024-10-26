import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SelectorsComponent } from "../selectors/selectors.component";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent  implements OnInit {

  ngOnInit(): void {

  }


  public isSidebarVisible: boolean = false;

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }



}
