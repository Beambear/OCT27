import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update-list',
  templateUrl: './user-update-list.component.html',
  styleUrls: ['./user-update-list.component.css']
})
export class UserUpdateListComponent {


  usersToUpdate: User[] = [];
  @Output() userConfirmed: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  confirmUpdate(user: User) {
    // send update request to back-end
    this.userService.confirmUserUpdate(user).subscribe(
      response => {
        // remove confirmed user
        const index = this.usersToUpdate.indexOf(user);
        if (index > -1) {
          this.usersToUpdate.splice(index, 1);
        }
        //trigger event
        this.userConfirmed.emit(user);
      },
      error => {
        console.error("Error during API call:", error);
        alert("Error during API call. Check the console for more details.");
      }
    );
    
  }
  

  ngOnInit() {
    this.userService.getUpdateUsersList().subscribe(dbList => {
      this.usersToUpdate = dbList;
    });
  }

}
