import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

}
