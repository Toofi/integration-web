import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
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
  @Output() isAuthentified = new EventEmitter<boolean>();
  loading: boolean = false;
  private auth: Credentials = { username: '', password: '' };
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  authForm: FormGroup | any;

  constructor(private httpTracker: HttpTrackerService,
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }


  onSubmit() {
    this.auth.username = this.authForm.value['username'];
    this.auth.password = this.authForm.value['password'];
    this.httpTracker.logIn(this.auth)
    .pipe(takeUntil(this._destroy$))    
    .subscribe(() => {
      console.log("Login réussi")
      this.loading = false;
      this.display.emit(false);
      this.isAuthentified.emit(true);
      this.router.navigate(['/dashboard']);
    });
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  };

}
