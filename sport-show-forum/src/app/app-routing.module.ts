import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'all-posts', pathMatch: 'full'},
  {path: 'posts',
  loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
},
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
