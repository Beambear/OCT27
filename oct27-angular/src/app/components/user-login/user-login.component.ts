import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LogRequest } from 'src/app/model/logRequest.model';
import { UpdateUser } from 'src/app/model/updateUser.model';
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
  user: User | null = null;
  updateUser: UpdateUser | null = null;
  avatarSrc: string | null = null;
  
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
    ) { } 


    loadAvatar(): void {
      console.log('loadAvatar called'); // log
      if (this.user && this.user.avatarName) {
        this.userService.getAvatar(this.user.avatarName).subscribe({
          next: (file: Blob) => {
            const objectURL = URL.createObjectURL(file);
            this.avatarSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL) as string;
          },
          error: (error) => {
            console.error('Error loading avatar:', error);
          }
        });
      }
    }
    
    
  ngOnInit(): void {
    // check
    this.loggedIn = this.authService.isLoggedIn;
    if (this.loggedIn) {  //logged in

      const userId = this.authService.getUserId();
      if(userId != null){
        this.userService.getUserInfoById(userId).subscribe(userInfo => {
                  this.user = userInfo;
                  this.loadAvatar();
              }, error => {
                  console.error('Failed get user info:', error);
              });
      }
  }
  }

  cancelEdit() :void{
    this.editing = !this.editing;
  }

  logOff(): void{
    this.authService.logout;
    this.loggedIn = false;
    this.updateUser = null;
    this.password = "";
  }

  onLogin(): void {
    const logRequest: LogRequest = {
      email: this.email,
      password: this.password
    };

    this.userService.login(logRequest).subscribe(response => {
      if (response !== null && response.id !== undefined) {
        this.user = response; // store user object
        this.loggedIn = true;
        const userId: number = response.id;
        this.authService.login(userId); 
        this.loadAvatar();
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
