import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workout, WorkOuts, WorkoutWithExercise } from 'src/app/models/workout';
import { Exercise, Exercises} from '../../models/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  public workout: WorkoutWithExercise;
  
  constructor(
    private exerciseservice: ExerciseService,
    private router: Router,
    ) { }

  getExercises(): void {
    console.log('hello from exercises');
    let _id = localStorage.getItem('id');
    console.log(_id)
    this.exerciseservice.getExercises(_id).subscribe((data: any) => {
      this.workout = data.workout;
      console.log(data.workout.exercises);
    }); 
  }

  ngOnInit(): void {
    this.getExercises();
  }
}
