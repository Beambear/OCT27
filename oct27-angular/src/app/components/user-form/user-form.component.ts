import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserRequest } from 'src/app/model/userRequest.model';
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

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.user.profilePic = event.target.files[0];
    }
  }
  

  createUser() {
    const formData: FormData = new FormData();
    
    // Strings
    const userRequest = new UserRequest();
    userRequest.id = this.user.id;
    userRequest.name = this.user.name;
    userRequest.email = this.user.email;
    userRequest.phone = this.user.phone;
    formData.append('userRequest', JSON.stringify(userRequest));

// 然后使用FormData发送HTTP请求

    // profile pic to formData
    if (this.user.profilePic) {
      formData.append('file', this.user.profilePic);
    }

    this.userService.addUser(formData).subscribe(
      response => {
        this.userCreated.emit();
        console.log('User created successfully:', response);
        // Handle success scenario here
      },
      error => {
        console.error('Error creating user:', error);
        // Handle error scenario here
      }
    );
}

  
}
