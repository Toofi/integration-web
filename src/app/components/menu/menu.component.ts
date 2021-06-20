import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  display: boolean = false;
  public modalType: number = 0;

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
        command: () => { 
          this.modalType = 1;
          this.display = true;
        }
      },
      {
        label: "Se connecter",
        icon: 'pi pi-fw pi-home',
        command: () => { 
          this.modalType = 2;
          this.display = true;
        }
      },
    ];
  };

  setDisplay (value: boolean) {
    this.display = value;
  }

}
