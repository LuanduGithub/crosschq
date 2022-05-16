import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';
import { SharedDataService } from 'src/app/services/shared-services.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  public posts$ = this.sharedDataService.posts$;
  constructor(
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}
  public gotoDetail(post: Post): void {
    this.sharedDataService.post$.next(post);
    this.router.navigate(['/detail']);
  }
}
