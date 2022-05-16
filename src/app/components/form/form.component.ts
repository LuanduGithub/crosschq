import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';
import { SharedDataService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public posts!: Post[] | undefined;
  public post!: Post | undefined;
  public form!: FormGroup;
  public edit = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedDataService: SharedDataService
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      comment: [null, Validators.required]
    });
    this.post = this.sharedDataService.post$.getValue();
    if (this.ifEdit()) {
      this.form.get('title')?.setValue(this.post?.title);
      this.form.get('comment')?.setValue(this.post?.body);
    }

    this.posts = this.sharedDataService.posts$.getValue();
  }

  public onSubmit(): void {
    let postsEdit: Post[] | undefined;
    if (this.ifEdit()) {
      postsEdit = this.posts?.map((post) => {
        return {
          title: post.id === this.post?.id ? this.form.controls.title.value : post.title,
          body: post.id === this.post?.body ? this.form.controls.comment.value : post.body,
          id: post.id,
          comments: post.comments
        };
      });
    } else {
      const postNewValues: Post = {
        title: this.form.controls.title.value,
        body: this.form.controls.comment.value,
        id: Math.floor(Math.random() * 1000),
        comments: []
      };
      this.posts?.push(postNewValues);

    }
    this.sharedDataService.posts$.next(this.ifEdit() ? postsEdit : this.posts);
    this.gotoPosts();
  }

  public gotoPosts(): void {
    this.form.reset();
    this.sharedDataService.edit$.next(false);
    this.router.navigate(['']);
  }

  private ifEdit(): boolean {
    return this.sharedDataService.edit$.getValue();
  }
}
