import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createForm!: FormGroup;
  submitted: boolean = false;
  serverErr: string | undefined;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      image: [''],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.createForm.invalid) {
      return;
    }
    const additionalData = {
      likes: [],
      comments: [],
      owner: this.userService.user?._id
    }

    const data = Object.assign({}, this.createForm.value, additionalData);
    
    this.postService.createPost(data).subscribe({
      next: () => {
        this.router.navigate(['/post/all-posts']);
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/']);
      }
    });
  }

}
