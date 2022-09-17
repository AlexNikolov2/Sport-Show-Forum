import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { SharedModule } from '../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
  declarations: [
    AllPostsComponent,
    PostDetailsComponent,
    CreatePostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AllPostsComponent,
    CreatePostComponent,
    EditPostComponent,
    PostDetailsComponent,
    PostsRoutingModule
  ]
})
export class PostsModule { }
