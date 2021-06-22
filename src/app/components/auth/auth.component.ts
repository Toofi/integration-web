import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Credentials } from 'src/app/interfaces/credentials';
import { HttpTrackerService } from 'src/app/services/http-tracker.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @Output() display = new EventEmitter<boolean>();
  @Output() isAuth = new EventEmitter<boolean>();
  loading: boolean = false;
  private auth: Credentials = { username: '', password: '' };
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private httpTracker: HttpTrackerService,
    private router: Router) { }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }


  onSubmit(form: NgForm) {
    this.auth.username = form.value['name'];
    this.auth.password = form.value['password'];
    this.httpTracker.logIn(this.auth)
    .pipe(takeUntil(this._destroy$))    
    .subscribe(() => {
      console.log("Login réussi")
      this.loading = false;
      this.display.emit(false);
      this.isAuth.emit(true);
      this.router.navigate(['/dashboard']);
    });
  }

}
