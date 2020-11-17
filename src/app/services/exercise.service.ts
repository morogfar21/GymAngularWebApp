import { Injectable } from '@angular/core';
import { Workout, WorkOuts, WorkoutWithExercise} from '../models/workout';
import { Exercise, Exercises} from '../models/exercise';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  public header = new HttpHeaders().set('Content-Type', 'application/json');
  private workoutSubject: BehaviorSubject<Workout>;
  private workout: Observable<Workout>;
  private exerciseSubject: BehaviorSubject<Exercise>;
  private exercise: Observable<Exercise>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.workoutSubject = new BehaviorSubject<Workout>(JSON.parse(localStorage.getItem('workout')));
    this.workout = this.workoutSubject.asObservable();

    this.exerciseSubject = new BehaviorSubject<Exercise>(JSON.parse(localStorage.getItem('exercise')));
    this.exercise = this.exerciseSubject.asObservable();
   }

   public get workoutValue(): Workout {
    return this.workoutSubject.value;
   }

    public get exerciseValue(): Exercise {
      return this.exerciseSubject.value;
  }

  //PROGRAMS:
  getWorkoutPrograms(): Observable<WorkOuts> {
    let apiUrl = `${environment.apiUrl}/workout/list`;
    return this.http.get<WorkOuts>(apiUrl)
      .pipe(     
        catchError(this.handleError<WorkOuts>('getWorkoutPrograms'))
      );
  }

  //Add A Workout program.
  addWorkoutProgram(workout: Workout, token: any) {
    const apiUrl = `${environment.apiUrl}/workout/add`; 
    const body = JSON.stringify({ name: workout.name });
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    const httpOptions = {headers: header};
    console.log(token);
    // {headers: this.header, responseType: 'json'}
    return this.http.post(apiUrl , body , httpOptions)
    .pipe(
      catchError(this.handleError<any>('addWorkoutProgram'))
    );
  }

  //get all exercises
  getExercises(id: any): Observable<WorkoutWithExercise> {
    const apiUrl = `${environment.apiUrl}/exercise/list/?id=${id}`;
    return this.http.get<WorkoutWithExercise>(apiUrl)
    .pipe(
      catchError(this.handleError<WorkoutWithExercise>('getExercises'))
    )
  }

  updateWorkoutProgram(workoutInfo: any): Observable<any> {
    const apiUrl = `${environment.apiUrl}/programs`;
    const jsonObject = JSON.stringify(workoutInfo);
    return this.http.put(apiUrl, jsonObject, {headers: this.header, responseType: 'json'})
    .pipe(
      catchError(this.handleError<any>('updateWorkoutProgram'))
      ); 
  
  }

  //Add exercise with exercise information
  addExercise(exercise: Exercise, token: any, workoutName: any) {
    const apiUrl = `${environment.apiUrl}/exercise/add`; 
    console.log(exercise);
    console.log(workoutName);
    const body = JSON.stringify({
      exerciseName: exercise.name,
      descrip: exercise.description,
      sets: exercise.sets,
      reps: exercise.reps,
      name: workoutName
    });

    console.log(body);
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    const httpOptions = {headers: header};
    // {headers: this.header, responseType: 'json'}
    return this.http.post(apiUrl , body , httpOptions)
    .pipe(
      catchError(this.handleError<any>('addWorkoutProgram'))
    );
  }

  //
  deleteExercise(id: string, exercise: Exercise) {
    const apiUrl = `${environment.apiUrl}/exercise/delete/?id=${id}`;
    const jsonObject = JSON.stringify(exercise);
    return this.http.post(apiUrl, jsonObject, {headers: this.header, responseType: 'text'})
    .pipe(
      catchError(this.handleError<any>('deleteExercise'))
      );
  }

  editExercise(exercise: Exercise) {
    const apiUrl = `${environment.apiUrl}/exercise`;
    const jsonObject = JSON.stringify(exercise);
    return this.http.put(apiUrl, jsonObject, {headers: this.header, responseType: 'text'})
    .pipe(
      catchError(this.handleError<Exercises>('editExercise'))
      );
  }

  //Error Handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return error;
    };
  }

}
