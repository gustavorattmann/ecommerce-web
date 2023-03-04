import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-commerce Web';
  opened = false;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  alternarMenu() {
    this.sidenav.toggle();

    this.opened = !this.opened;
  }

  fecharMenu() {
    this.sidenav.close();

    this.opened = false;
  }
}
