import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Workout, WorkOuts } from 'src/app/models/workout';
import { Exercise, Exercises } from 'src/app/models/exercise';
import { AccountService } from 'src/app/services/account.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { userInfo } from 'os';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})

export class ProgramsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  userIsLoggedIn: boolean;
  // public workOutData: BehaviorSubject<WorkOuts>;
  public workOutData: WorkOuts;
  public exerciseData: Exercises;
  // public exerciseData: BehaviorSubject<Exercises>;
  displayedColumns: string[] = ['Name', 'Description', 'Sets', 'Reps'];
  dataSoruce: any[]
  constructor(
    private accountservice: AccountService,
    private exerciseservice: ExerciseService,
    private router: Router,
  ) { }

  opened(workout: Workout) {
    console.log("Workout id: " +workout._id);
    console.log("reached afterExpand of column");
    this.exerciseservice.getExercises(workout._id).subscribe((results) => this.exerciseData = results);
    this.dataSoruce = this.exerciseData.exerciseData;
  }

  createExercise(workout: Workout){
    const token = localStorage.getItem('token');
    if(token) {
      console.log('Token was valid')

      localStorage.setItem('id', workout._id);

      this.router.navigateByUrl('/create-exercise');

      // this.router.navigateByUrl('/create-exercise', { 
      //   state: { name: workout.name , id: workout._id } 
      // });
    } else {
        //this.router.navigateByUrl('/login');
        console.log('Token was not valid - login required')
        this.router.navigateByUrl('login');
    }
  } 
  //this._router.navigate(['SecondComponent', {p1: this.property1, p2: property2 }]);
  createProgram(){
    const token = localStorage.getItem('token');
    if(token) {
      console.log('Token was valid');
      this.router.navigateByUrl('/create-program');
    } else {
        //this.router.navigateByUrl('/login');
        console.log('Token was not valid - login required');
        //route til login, og giv fejl besked
        this.router.navigateByUrl('/login');
    }
  }

  addWorkoutLog(workout: Workout){
    const token = localStorage.getItem('token');
    this.accountservice.addWorkOutLog(workout, token).pipe(first())
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

  getWorkouts(): void {
    this.exerciseservice.getWorkoutPrograms().subscribe((workouts) => this.workOutData= workouts);
  }

  // public reloadPage() {
  //   this.reload();
  // }

  ngOnInit(): void {
    console.log("reached Programs ngOnInit");
    this.getWorkouts();

    this.accountservice.isLogdIn().subscribe((value) => {
      this.userIsLoggedIn = value;
    });

  }
}
