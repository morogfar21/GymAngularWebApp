import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateExerciseComponent } from './views/create-exercise/create-exercise.component';
import { CreateProgramComponent } from './views/create-program/create-program.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProgramsComponent } from './views/programs/programs.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'programs', component: ProgramsComponent},
  { path: 'create-program', component: CreateProgramComponent},
  { path: 'create-exercise', component: CreateExerciseComponent},
  { path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }