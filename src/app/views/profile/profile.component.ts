import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workout, WorkOuts } from 'src/app/models/workout';
import { Exercise, Exercises } from 'src/app/models/exercise';
import { AccountService } from 'src/app/services/account.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userLogs: User;
  public logs: Workout[];
  constructor(private accountService: AccountService) {
      this.logs = this.userLogs.loggedWorkouts;
  }

  getWorkOutLogs() {
    this.accountService.getWorkoutLogs().subscribe((loggedWorkouts) => this.logs = loggedWorkouts);
  }

  

  ngOnInit(): void {
    console.log("reached Profile ngOnInit");
    this.getWorkOutLogs();
  }

}
