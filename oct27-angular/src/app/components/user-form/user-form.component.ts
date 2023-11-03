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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
        this.selectedFile = input.files[0];
    }
  }

  createUser() {
    this.userService.addUser(this.user).subscribe(
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
