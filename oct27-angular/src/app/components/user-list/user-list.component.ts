import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  avatarSrcs: string[] = []; 
  searchKey: string = '';

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  loadAvatarsForUsers(users: User[]): void {
    // inite avatarSrcs
    this.avatarSrcs = new Array(users.length);
    
    users.forEach((user, index) => {
      if (user && user.avatarName) {
        this.userService.getAvatar(user.avatarName).subscribe({
          next: (file: Blob) => {
            const objectURL = URL.createObjectURL(file);
            this.avatarSrcs[index] = this.sanitizer.bypassSecurityTrustUrl(objectURL) as string;
          },
          error: (error) => {
            console.error(`Error loading avatar for user ${user.id}:`, error);
          }
        });
      }
    });
  }
  
  

  getUserList(): void {
    this.userService.getUserList().subscribe(users => {
      this.userList = users;
      this.filteredUsers = users; // default search -> display all
      this.loadAvatarsForUsers(this.filteredUsers); // load avatar for usrs
    }, error => {
      console.error('Error fetching user list:', error);
    });
  }

  onSearch(): void {
    if (!this.searchKey) {
      this.filteredUsers = this.userList; // display all if no search
    } else {
      this.filteredUsers = this.userList.filter(user => 
        user.name?.includes(this.searchKey) || 
        user.email?.includes(this.searchKey) || 
        user.phone?.includes(this.searchKey)
      );
    }
  }
  
}
