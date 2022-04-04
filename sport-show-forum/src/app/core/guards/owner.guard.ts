import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Injectable()

export class OwnerGuard implements CanActivate {
  constructor(private userService: UserService,
    private postService: PostService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const { id: postId } = route.params;

    return this.postService.getPost(postId).pipe(
      map((post) => {
       return post.user._id === this.userService.user?._id;
      })
    );
  }
}
