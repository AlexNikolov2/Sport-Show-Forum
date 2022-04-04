import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './edit-post/edit-post.component'
import { PostDetailsComponent } from './post-details/post-details.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: 'all-posts', component: PostsComponent, canActivate: [AuthGuard] , data: { authRequired: false } },
  { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard] , data: { title: 'Create Post', authRequired: true} },
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
