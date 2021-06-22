import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit, OnDestroy {

  @Output() display = new EventEmitter<boolean>();
  @Output() isAuth = new EventEmitter<boolean>();
  loading: boolean = false;
  errors: string | null | undefined;
  private _destroy$: Subject<boolean> = new Subject<boolean>();


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

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.user.username = form.value['username'];
    this.user.firstName = form.value['firstName'];
    this.user.lastName = form.value['lastName'];
    this.user.emails[0] = form.value['emails'];
    this.user.password = form.value['password'];
    const subscription = this.usersService.signIn(this.user)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        console.log("Inscription réussie")
        this.httpTracker.logOut();
        this.httpTracker.logIn({ username: this.user.username, password: this.user.password })
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
            console.log("Login réussi");
            this.loading = false;
            this.display.emit(false);
            this.isAuth.emit(true);
            this.router.navigate(['/dashboard']);
          });
      },
        (error) => {
          console.log("L'inscription a échoué : ", error);
          this.loading = false;
          this.errors = "L'inscription a échoué";
        });
  }

}
