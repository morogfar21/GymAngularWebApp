import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/models/exercise';
import { Workout } from 'src/app/models/workout';
import { AccountService } from 'src/app/services/account.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})
export class CreateProgramComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  

  constructor(
    private formbuilder: FormBuilder,
    private accountservice: AccountService,
    private exerciseservice: ExerciseService,
    private router: Router
  ) { }

  handleError(control: string, error: string){
    return this.form.controls[control].hasError(error);
  }

  saveWorkout() {
    console.log("Entered saveworkout")
    let token = localStorage.getItem('token');
    if (token){
      console.log("if form is valid, user can add program.. Token is valid: " + token);
      console.log('Form is valid and will add program');
      this.exerciseservice.addWorkoutProgram(this.form.value, token)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("maybe it worked")
        },
        error: error => {
          console.log(error);
          //handle and display error
        }
      })
    } else {
      console.log("User has not logged in, redirecting to login page.");
      this.router.navigateByUrl('login');
    }

    this.router.navigateByUrl('programs');
  }

  ngOnInit(): void {
    
  }

}
