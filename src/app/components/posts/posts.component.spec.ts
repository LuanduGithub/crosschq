import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppRoutingModule } from './../..//app-routing.module';
import { HeaderComponent } from './../../core/header/header.component';
import { Post } from './../../core/models/post.model';
import { TextSizePipe } from './../../core/pipes/text-size.pipe';
import { SharedDataService } from './../..//services/shared-services.service';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  const service = jasmine.createSpyObj(SharedDataService, ['getPosts']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent, TextSizePipe, HeaderComponent],
      imports: [AppRoutingModule, HttpClientModule, MatCardModule, MatButtonModule, MatDividerModule, MatMenuModule, MatToolbarModule, MatIconModule],
      providers: [{ provide: SharedDataService, useValue: service }, { provide: Router, useValue: router }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to /detail', () => {
    service.post$ = new BehaviorSubject('');
    spyOn(service.post$, 'next').and.callThrough;
    const post: Post = {
      "id": 1,
      "title": "test",
      "body": "test",
      "comments": [
        {
          "email": "test@mail.com",
          "comment": "test"
        }
      ]
    };
    component.gotoDetail(post);
    expect(service.post$.next).toHaveBeenCalledWith(post);
    expect(router.navigate).toHaveBeenCalledWith(['/detail']);
  });
});
