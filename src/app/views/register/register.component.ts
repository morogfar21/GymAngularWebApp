import { registerLocaleData } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl, ValidationErrors, AbstractControl, ValidatorFn} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { first } from 'rxjs/operators';

import { AccountService } from '../../services/account.service';
@Component({
selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    confirmPass: new FormControl('')
  });
  submitted = false;

  confirmPassValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPass = control.get('confirmPass');
  
    return password && confirmPass && password.value === confirmPass.value ? { passwordMatch: true } : null;
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) { }

  //getter for form
  get getFormProperty() { return this.form.controls };

  get password() { return this.form.get('password'); }
  get confirmPass() { return this.form.get('confirmPass'); }

  getErrorMessage() {
    if (this.confirmPass.hasError('required')) {
      return 'You must enter a value';
    }
    
    return '';
      }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]], 
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    }
    // , { validators: this.confirmPassValidator }
    );
  }

  onSubmit() {
    this.submitted = true;
    //alert needed here maybe?

    //form validation check
    if(this.form.invalid == true) {
      console.log("Form input is invalid")
      return;
    }

    

    this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
              this.router.navigate(['../login'], {relativeTo: this.route});
            },
            error: error => {
              console.log(error);
              //handle and display error
            }
        })
  }

}