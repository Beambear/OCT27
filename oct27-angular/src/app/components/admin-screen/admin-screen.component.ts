import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.css']
})
export class AdminScreenComponent {
  @ViewChild('userListComponentRef', { static: false }) userListComponent: any;

  onUserCreated() {
    this.userListComponent.getUserList();
}

}
