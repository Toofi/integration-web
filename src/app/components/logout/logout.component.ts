import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  @Output() display = new EventEmitter<boolean>();
  @Output() isAuth = new EventEmitter<boolean>();

  constructor(public httpTracker: HttpTrackerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.httpTracker.logOut();
    console.log("Login réussi");
    this.display.emit(false);
    this.isAuth.emit(false);
    this.router.navigate(['/']);
  }

}
