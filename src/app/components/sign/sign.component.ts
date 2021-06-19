import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  private user: User = {
    username: '',
    firstName:'',
    lastName:'',
    emails: [],
    password: '',
  }

  constructor(private usersService : UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.user.username = form.value['username'];
    this.user.firstName = form.value['firstName'];
    this.user.lastName = form.value['lastName'];
    this.user.emails[0] = form.value['emails'];
    this.user.password = form.value['password'];
    this.usersService.signIn(this.user).subscribe()
    this.usersService.getUsers();
  }

}
