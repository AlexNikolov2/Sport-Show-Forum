import { Component } from '@angular/core';
import { PostService } from './core/services/post.service';
import { UserService } from './core/services/user.service';
import { IPost } from './shared/interface/post';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sport-show-forum';
  posts: IPost[] = [];
  constructor(private userService: UserService) {
    this.userService.getUser().subscribe({
      error: (error) =>{
        this.userService.user = null;
        throw error;
      }
    })
    }
}
