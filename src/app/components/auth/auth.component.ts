import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/interfaces/credentials';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Output() display = new EventEmitter<boolean>();
  loading: boolean = false;
  private auth: Credentials = { username: '', password: '' };

  constructor(private httpTracker: HttpTrackerService,
    private router: Router) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit(form: NgForm) {
    this.auth.username = form.value['name'];
    this.auth.password = form.value['password'];
    this.httpTracker.logIn(this.auth).subscribe(() => {
      console.log("Login réussi")
      this.loading = false;
      this.display.emit(false);
      this.router.navigate(['/dashboard']);
    });
  }

}
