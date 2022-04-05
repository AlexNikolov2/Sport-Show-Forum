import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { IPost } from 'src/app/shared/interface/post';
import { IUser } from 'src/app/shared/interface/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts: IPost[] | undefined;

  get user(){
    return this.userService.user;
  }

  constructor(private userService: UserService, private postService: PostService) { 
    this.userService.getUser().subscribe({
      error: (error) =>{
        this.userService.user = null;
        throw error;
      }
    })
    this.postService.getPosts().subscribe(posts => {
      this.postService.posts = posts;
    })
  }

  ngOnInit(): void {
  }

}
