import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './../..//app-routing.module';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { TemplateRef } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [AppRoutingModule, HttpClientModule,MatToolbarModule, MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule],
      providers: [{ provide: Router, useValue: router }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to /home', () => {
    component.gotoPosts();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
  it('should navigate to /admin', () => {
    component.gotoForm();
    expect(router.navigate).toHaveBeenCalledWith(['admin']);
  });
});
