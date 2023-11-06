import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User = new User();
  @Output() userCreated = new EventEmitter<void>();


  constructor(private userService: UserService) { }


  ngOnInit(): void {
  }

  selectedFile: File | null = null;

  uploadUserAvatar(userId: number): void {
    if (this.selectedFile) {
      this.userService.postAvatar(this.selectedFile, userId, 1).subscribe(
        response => {
          console.log('Avatar uploaded successfully', response);
        },
        error => {
          console.error('Error uploading avatar', error);
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }

  createUser() {
    this.userService.addUser(this.user).subscribe(
      response => {
        console.log('User created successfully:', response);
        // User has been created,  get the user info
        this.userService.getUserInfoByEmail(this.user.email).subscribe(
          userInfo => {
            if (userInfo && userInfo.id !== undefined) {
              //have the user ID, upload the avatar
              this.uploadUserAvatar(userInfo.id);
            } else {
              // Handle the case where user info is not returned properly
              console.error('User info not returned or missing ID');
            }
          },
          error => {
            console.error('Unable to get user info', error);
          }
        );
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
  }
  
  
}
