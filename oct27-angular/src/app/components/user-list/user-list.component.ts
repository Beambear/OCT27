import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  filteredUsers: User[] = [];
  searchKey: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.userService.getUserList().subscribe(users => {
      this.userList = users;
      this.filteredUsers = users; // default search -> display all
    }, error => {
      console.error('Error fetching user list:', error);
    });
  }

  onSearch(): void {
    if (!this.searchKey) {
      this.filteredUsers = this.userList; // 如果搜索关键字为空，则显示所有用户
    } else {
      this.filteredUsers = this.userList.filter(user => 
        user.name?.includes(this.searchKey) || 
        user.email?.includes(this.searchKey) || 
        user.phone?.includes(this.searchKey)
      );
    }
  }
  
}
