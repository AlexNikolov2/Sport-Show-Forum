import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IPost } from 'src/app/shared/interface/post';
import { IComment } from 'src/app/shared/interface/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<IPost[]>('/posts');
  }

  getPost(id: string) {
    return this.http.get<IPost>(`/posts/${id}`);
  }

  createPost(data: {keyword: string; title: string; img?: string; description: string;}) {
    return this.http.post<IPost>('/posts', data);
  }

  updatePost(id: string, data: {keyword: string; title: string; img?: string; description: string;}) {
    return this.http.put<IPost>(`/posts/${id}`, data);
  }

  deletePost(id: string) {
    return this.http.delete<IPost>(`/posts/${id}`);
  }

  likePost(id: string) {
    return this.http.post<IPost>(`/posts/${id}/like`, {});
  }

  comment(id: string, content: string) {
    return this.http.post<IComment>(`/posts/${id}/comment`, {content});
  }

  likeComment(postId: string, commentId: string) {
    return this.http.post<IComment>(`/posts/${postId}/comment/${commentId}/like`, {});
  }
}
