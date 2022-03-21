import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  catchError,
  distinctUntilChanged,
  filter,
  finalize,
  interval,
  retry,
  share,
  shareReplay,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { CommentsService } from './comments.service';

@Component({
  selector: 'mailchimp-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'comments-feed';
  shouldPull = true;
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

  comments$ =  timer(1, 5000).pipe(
    switchMap(() =>this.commentService.getComments()),
    retry(),
    shareReplay(1) 
  );

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentsService,
    private cdref: ChangeDetectorRef
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
          tap(() => this.shouldPull = true),
          finalize(() => {
            this.commentForm.reset();
            //this.cdref.detectChanges();
          })
        )
        .subscribe();
    } else {
      // if it has errors, we want to show it.
      console.log(this.commentForm.errors);
    }
  }
}
