import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update-list',
  templateUrl: './user-update-list.component.html',
  styleUrls: ['./user-update-list.component.css']
})
export class UserUpdateListComponent {


  usersToUpdate: User[] = [];

  constructor(private userService: UserService) { }

  confirmUpdate(user: User) {
    // send update request to back-end
    this.userService.confirmUserUpdate(user).subscribe(response => {
      // remove confirmed user
      const index = this.usersToUpdate.indexOf(user);
      if (index > -1) {
        this.usersToUpdate.splice(index, 1);
      }
    });
  }
  

  ngOnInit() {
    this.userService.getUpdateUsersList().subscribe(dbList => {
      this.usersToUpdate = dbList;
    });
  }

}
