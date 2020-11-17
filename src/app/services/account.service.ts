import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Workout, WorkOuts } from '../models/workout';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { Token } from '../models/token';
import { environment } from 'src/environments/environment';
import { JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public header = new HttpHeaders().set('Content-Type', 'application/json');
  private userSubject: BehaviorSubject<Token>;
  private user: Observable<Token>;
  private loggedInCheck: BehaviorSubject<boolean>;
  //public jwtHelper: JwtHelperService;
  //private tokenSubject: BehaviorSubject<Token>;
  

  constructor(
    public jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient,
    //public loggedIn: boolean
  ) {
    this.loggedInCheck = new BehaviorSubject<boolean>(false);
    //this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
    //this.user = this.userSubject.asObservable();
    //this.tokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('token')));
   }

  //  public get userValue(): User {
  //    return this.userSubject.value;
  //  }

   //Login
   login(userInfo: User): Observable<any> {
     const apiUrl = `${environment.apiUrl}/authentication/login`;
     return this.http.post<Token>(apiUrl, userInfo, {headers: this.header, responseType: 'json'})
     .pipe(map(token =>{
       JSON.stringify(token);
       localStorage.setItem('token', token.token);
       console.log("User is logging in.." + token);
       return token;
     }));
   }

   logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
    localStorage.clear();
    //this.userSubject.next(null);
    
    this.router.navigate(['/account/login']);
    console.log("logging user out");
    window.location.reload();
  }

  //Register
  register(userInfo: User) {
    const apiUrl = `${environment.apiUrl}/authentication/register`;
    const jsonObject = JSON.stringify(userInfo);
    return this.http.post(apiUrl, jsonObject, {headers: this.header, responseType: 'text'}
    );
  }

  getWorkoutLogs() {
    let apiUrl = `${environment.apiUrl}/workout/getLogs`;
    return this.http.get<Workout[]>(apiUrl)
    .pipe(map(token =>{
      localStorage.setItem('token', JSON.stringify(token));
      console.log("User: " + token);
      return token;
    }));
  }

  addWorkOutLog(workout: Workout, token: any) {
    let apiUrl = `${environment.apiUrl}/workout/addLogs`;
    const body = JSON.stringify({ workoutToLogId: workout._id });
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    const httpOptions = {headers: header};
    console.log(token);
    // {headers: this.header, responseType: 'json'}
    return this.http.post(apiUrl , body , httpOptions)
    .pipe(
      catchError(this.handleError<any>('addWorkOutLog'))
    );
  }

  public isLogdIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    this.loggedInCheck.next(!this.jwtHelper.isTokenExpired(token));
    return this.loggedInCheck.asObservable();
  }

  public setIsLogIn(value: boolean): void {
    this.loggedInCheck.next(value);
  }

  // public isLoggedIn() {
  //  const token = this.getToken();
  //  if (token) {
  //    //const payload = JSON.parse(window.atob(token.split('.')[1]));
  //    //return payload.export > Date.now() /1000;
  //    return true;
  //  } else {
  //    return false;
  //  }
  // }
  
   getToken(): string {
    return localStorage.getItem('token');
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
