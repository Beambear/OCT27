import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LogRequest } from 'src/app/model/logRequest.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {
  email?: string;
  password?: string;
  loggedIn = false;  // defualt is false
  editing = false;
  public user: User | null = null;
  public updateUser: User | null = null;
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    ) { } 

  ngOnInit(): void {
    // check
    this.loggedIn = this.authService.isLoggedIn;
  }

  onLogin(): void {
    const logRequest: LogRequest = {
      email: this.email,
      password: this.password
    };

    this.userService.login(logRequest).subscribe(response => {
      if (response !== null) {
        this.user = response; // store user object
        this.loggedIn = true;
        this.authService.login(); 
      } else {
        alert('login failed');
      }
    });
    
  }

  toggleEdit(): void {
    if (this.editing) {
      this.saveChanges();
    } else {
      // copy user to updateUser
      this.updateUser = { ...this.user };
    }
    this.editing = !this.editing;
  }

  saveChanges(): void {
    if (this.updateUser) {
        this.userService.submitUpdate(this.updateUser).subscribe(response => {
            alert('Changes saved! Wait for admin confirmation.');
        }, error => {
            console.error('Error submitting update:', error);
        });
    }
}


}