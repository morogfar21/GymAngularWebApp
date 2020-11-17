import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Exercise } from 'src/app/models/exercise';
import { Workout } from 'src/app/models/workout';
import { AccountService } from 'src/app/services/account.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    sets: new FormControl('', [Validators.required]),
    reps: new FormControl('', [Validators.required])
  });

  constructor(
    private formbuilder: FormBuilder,
    private accountservice: AccountService,
    private exerciseservice: ExerciseService,
    private router: Router,
    public activatedRoute: ActivatedRoute
    ) {}

  public handleError = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }

  saveExercise(){
    console.log("Entered Save Exercise")
    //Tries to get token from users localstorage.
     let token = localStorage.getItem('token');
    console.log("form name: " + this.form.value.name);
    console.log("form description: " + this.form.value.description);
    console.log("form sets: " + this.form.value.sets);
    console.log("form reps: " + this.form.value.reps);
    let name = localStorage.getItem('name');
    console.log("name " + name);
    

    if (token){
      console.log("User can add exercise if form is valid.. Token was valid: " + token);
      if(this.form.valid) {
        console.log('Form was valid, trying to add exercise: ' + this.form.value);
        this.exerciseservice.addExercise(this.form.value, token, name).pipe(first())
        .subscribe({
          next: () => {
            console.log("maybe it worked")
          },
          error: error => {
            console.log(error);
            //handle and display error
          }
        })
      }
    }
    else {
      console.log("User was not logged in, will be redirected to login.")
       this.router.navigateByUrl('login');
    }
  }

  ngOnInit(): void {
  }
}
