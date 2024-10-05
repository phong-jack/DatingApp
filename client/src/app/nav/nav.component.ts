import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccoutService } from 'src/app/_services/accout.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  constructor(public accoutService: AccoutService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.accoutService.login(this.model).subscribe({
      next: (_) => this.router.navigateByUrl('/members'),
    });
  }

  logout() {
    this.accoutService.logout();
    this.router.navigateByUrl('/');
  }
}
