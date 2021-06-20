import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  private user: User = {
    username: '',
    firstName: '',
    lastName: '',
    emails: [],
    password: '',
  }

  constructor(private usersService: UsersService,
    private httpTracker: HttpTrackerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.user.username = form.value['username'];
    this.user.firstName = form.value['firstName'];
    this.user.lastName = form.value['lastName'];
    this.user.emails[0] = form.value['emails'];
    this.user.password = form.value['password'];
    this.usersService.signIn(this.user).
      subscribe(() => console.log("Inscription réussie"), (error) => console.log("L'inscription a échoué : ", error))
    this.httpTracker.logIn({ username: this.user.username, password: this.user.password});
    this.router.navigate(['/dashboard']);
  }

}
