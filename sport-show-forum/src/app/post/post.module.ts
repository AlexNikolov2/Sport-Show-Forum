import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';



@NgModule({
  declarations: [
    PostDetailsComponent,
    PostsComponent,
    CreatePostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CreatePostComponent,
    EditPostComponent
  ]
})
export class PostModule { }
