import {Workout} from '../models/workout';

export class User {
    username: string;
    password: string;
    
    loggedWorkouts: Workout[];
}