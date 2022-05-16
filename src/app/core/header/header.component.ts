import { Component, Input, OnChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  @Input()
  public titleTemplate!: TemplateRef<any>;
  public customtitleTemplate!: TemplateRef<any>;
  constructor(
    private router: Router
  ){}
  public ngOnChanges(): void {
    this.customtitleTemplate = this.titleTemplate;
  }
  public gotoPosts(): void {
    this.router.navigate(['']);
  }
  public gotoForm(): void {
    this.router.navigate(['admin']);
  }
}
