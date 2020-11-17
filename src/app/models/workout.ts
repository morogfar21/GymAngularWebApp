import { Exercise, Exercises} from '../models/exercise';
//Workout program which contains several exercises.
export class Workout{
    name: string;
    _id: any;
}

export class WorkoutWithExercise{
    name: string;
    _id: any;
    exercises: Exercise[];
}

export class WorkOuts{
    workouts: Workout[];
}