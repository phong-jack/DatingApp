import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccoutService } from 'src/app/_services/accout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  users: any;

  constructor(private accoutService: AccoutService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accoutService.setCurrentUser(user);
  }
}
