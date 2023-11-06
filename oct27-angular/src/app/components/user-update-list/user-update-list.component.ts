import { Component, EventEmitter, Output } from '@angular/core';
import { UpdateUser } from 'src/app/model/updateUser.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update-list',
  templateUrl: './user-update-list.component.html',
  styleUrls: ['./user-update-list.component.css']
})
export class UserUpdateListComponent {


  updateUserList: UpdateUser[] = [];
  @Output() userConfirmed: EventEmitter<UpdateUser> = new EventEmitter<UpdateUser>();

  constructor(private userService: UserService) { }

  declineUpdate(updateUser: UpdateUser) {
    // send update request to back-end
    updateUser.confirmed = 2;
    this.userService.confirmUserUpdate(updateUser).subscribe(
      response => {
        // remove confirmed user
        const index = this.updateUserList.indexOf(updateUser);
        if (index > -1) {
          this.updateUserList.splice(index, 1);
        }
        //trigger event
        this.userConfirmed.emit(updateUser);
      },
      error => {
        console.error("Error during API call:", error);
        alert("Error during API call. Check the console for more details.");
      }
    );
    
  }

  confirmUpdate(updateUser: UpdateUser) {
    // send update request to back-end
    updateUser.confirmed = 1;
    this.userService.confirmUserUpdate(updateUser).subscribe(
      response => {
        // remove confirmed user
        const index = this.updateUserList.indexOf(updateUser);
        if (index > -1) {
          this.updateUserList.splice(index, 1);
        }
        //trigger event
        this.userConfirmed.emit(updateUser);
      },
      error => {
        console.error("Error during API call:", error);
        alert("Error during API call. Check the console for more details.");
      }
    );
    
  }
  

  ngOnInit() {
    this.userService.getUpdateUsersList().subscribe(dbList => {
      this.updateUserList = dbList;
    });
  }

}
