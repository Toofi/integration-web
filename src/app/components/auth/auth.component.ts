import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Credentials } from 'src/app/interfaces/credentials';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private httpTracker: HttpTrackerService) { }

  private auth: Credentials = { username: '', password: '' };

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.httpTracker.logIn(this.auth).unsubscribe();
  }

  onSubmit(form: NgForm) {
    console.log(form.value['name']);
    this.auth.username = form.value['name'];
    this.auth.password = form.value['password'];
    this.httpTracker.logIn(this.auth);
  }

}
