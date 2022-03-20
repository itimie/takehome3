import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from './comments.service';

@Component({
  selector: 'mailchimp-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'comments-feed';
  commentForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    comment: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentsService
  ) {}

  submit() {
    if (this.commentForm.valid) {
      this.commentService.submitComment(
        this.commentForm.get('name')?.value,
        this.commentForm.get('comment')?.value
      );
      console.log(this.commentForm.value);
    } else {
      // if it has errors, we want to show it.
      console.log(this.commentForm.errors);
    }
  }
}
