import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, finalize, take } from 'rxjs';
import { CommentsService } from './comments.service';

@Component({
  selector: 'mailchimp-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  comments$ = this.commentService.getComments();

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentsService
  ) {}

  submit() {
    if (this.commentForm.valid) {
      this.commentService
        .submitComment(
          this.commentForm.get('name')?.value,
          this.commentForm.get('comment')?.value
        )
        .pipe(
          take(1),
          finalize(() => this.commentForm.reset())
        )
        .subscribe();
    } else {
      // if it has errors, we want to show it.
      console.log(this.commentForm.errors);
    }
  }
}
