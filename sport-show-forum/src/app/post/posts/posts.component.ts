import { Component } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { IPost } from 'src/app/shared/interface/post';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  posts: IPost[] | undefined;

  constructor(private postService: PostService, private userService: UserService) { 
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.posts = undefined;
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

}
