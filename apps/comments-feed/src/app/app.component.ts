import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  catchError,
  debounce,
  finalize,
  of,
  retry,
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
          catchError((e) => {
            //dispatch error
            return of();
          }),
          finalize(() => {
            this.commentForm.reset();
          }),
          tap(() => {
            //this.commentService.triggerload.next(true);
            this.comments$ = this.getComments();
            this.cdref.detectChanges()
          }),
          take(1)
        )
        .subscribe();
    } else {
      // if it has errors, we want to show it.
      console.log(this.commentForm.errors);
    }
  }

  getComments(){
    return this.commentService.getComments();
  }

  canSubmit() {
    return this.commentForm.valid && this.commentForm.touched;
  }

  deleteAll() {
    this.commentService
      .deleteComments()
      .pipe(
        tap(() => {
          this.comments$ = this.commentService.getComments();
          this.cdref.detectChanges();
        }),
        take(1),
      )
      .subscribe();
  }
}
