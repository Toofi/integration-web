import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Tracker',
        icon: 'pi pi-fw pi-amazon',
        routerLink: ['/dashboard']
      },
      {
        label: "S'inscrire",
        icon: 'pi pi-fw pi-user-plus',
        routerLink: ['/sign']
      },
      {
        label: "Se connecter",
        icon: 'pi pi-fw pi-home',
        routerLink: ['/auth']
      },
    ];
  }

}
