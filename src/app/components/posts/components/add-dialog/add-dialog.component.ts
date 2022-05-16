import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Comments, Post } from './../../../../core/models/post.model';
import { SharedDataService } from './../../../../services/shared-services.service';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  public form!: FormGroup;
  public post!: Post | undefined;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private sharedDataService: SharedDataService,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      comment: [null, Validators.required]
    });
    this.post = this.sharedDataService.post$.getValue();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    const newComment: Comments = {
      email: this.form.controls.email.value,
      comment: this.form.controls.comment.value
    };
    this.post?.comments?.push(newComment);
    this.dialogRef.close();
  }
}
