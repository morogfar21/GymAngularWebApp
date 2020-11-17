import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from '../../models/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Token } from 'src/app/models/token';
import { ProgramsComponent } from '../../views/programs/programs.component';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  public token: string;
  private programsComponent: ProgramsComponent;

  constructor(
    private formbuilder: FormBuilder,
    private accountservice: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    
  ) {  }

    login(){
      const val = this.form.value;
      const user = new User();
      user.username = val.username;
      user.password = val.password;
      if (val.username && val.password){
        console.log("Value was found in form, logging user in: " + val.username + " " + val.password);
        this.accountservice.login(user).subscribe((res) => {
          this.token = res;
          //this.router.navigate(['/programs']);
          this.accountservice.setIsLogIn(true);
          this.router.navigateByUrl('/programs');
        
        });
        
        
        console.log("Token is: " + this.token);
        
      }
      //location.reload();
    
    }
  
  ngOnInit(): void {
    
  }
}
