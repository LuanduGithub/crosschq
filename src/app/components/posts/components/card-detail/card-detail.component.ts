import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { Post } from './../../core/models/post.model';
import { SharedDataService } from './../..//services/shared-services.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  public posts!: Post[] | undefined;
  public post!: Post | undefined;
  public post$ = this.sharedDataService.post$.pipe(tap((post) => {
    if (!post) { this.gotoPost(); }
    this.post = post;
  }));
  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    public dialog: MatDialog
  ) { }
  public ngOnInit(): void {
    this.posts = this.sharedDataService.posts$.getValue();
  }
  public gotoPost(): void {
    this.sharedDataService.edit$.next(false);
    this.router.navigate(['posts']);
  }
  public gotoEdit(): void {
    this.sharedDataService.edit$.next(true);
    this.router.navigate(['admin']);
  }
  public delete(): void {
    const posts: Post[] | undefined = this.posts?.filter((post) => {
      return post.id !== this.post?.id;
    });
    this.sharedDataService.posts$.next(posts);
    this.gotoPost();
  }

  public openDialog(): void {
    this.dialog.open(AddDialogComponent, {
      width: '250px',
    });
  }
}
