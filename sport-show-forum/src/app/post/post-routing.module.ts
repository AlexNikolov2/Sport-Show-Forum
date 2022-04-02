import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './edit-post/edit-post.component'
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'edit/:id', component: EditPostComponent },
  { path: 'details/:id', component: PostDetailsComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostRoutingModule { }
