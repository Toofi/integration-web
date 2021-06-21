import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  display: boolean = false;
  public modalType: number = 0;
  isAuth: Boolean = this.httpTracker.getIsAuth();
  user: any;
  items: MenuItem[] = [];

  constructor(public httpTracker: HttpTrackerService,
    public usersService: UsersService) { }

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
      {
        label: "Se déconnecter",
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.modalType = 3;
          this.display = true;
        }
      },
    ];
  };

  setAuth(value: boolean) {
    this.isAuth = value;
    if (this.isAuth === true) {
      this.usersService.getUser(sessionStorage.getItem('trackerId')).subscribe((user) => {
        this.user = user;
        console.log(user);
      });
    }
  }

  setDisplay(value: boolean) {
    this.display = value;
  }

}
