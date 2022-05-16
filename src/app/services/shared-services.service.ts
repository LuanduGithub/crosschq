import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Post } from '../core/models/post.model';
import * as postsJSON from './../core/mocks/blog.json';
import { pluck, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public post$ = new BehaviorSubject<Post | undefined>(undefined);
  public posts$ = new BehaviorSubject<Post[] | undefined>(undefined);
  public edit$ = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient
  ) {
    this.getPosts().pipe(take(1)).subscribe((posts) => {
      this.posts$.next(posts);
    });
  }
  public getPosts(): Observable<Post[]> {
    return of(postsJSON).pipe(pluck('default')) as Observable<Post[]>;
  }
}
