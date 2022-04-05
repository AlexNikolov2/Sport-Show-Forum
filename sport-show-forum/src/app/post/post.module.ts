import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    PostDetailsComponent,
    PostsComponent,
    CreatePostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  /*exports: [
    PostRoutingModule,
    CreatePostComponent,
    EditPostComponent,
    PostsComponent,
    PostDetailsComponent
  ]*/
})
export class PostModule { }
