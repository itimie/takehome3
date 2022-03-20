import { Component, Input } from '@angular/core';

@Component({
  selector: 'mailchimp-monorepo-comment-block',
  templateUrl: './comment-block.component.html',
  styleUrls: ['./comment-block.component.scss']
})
export class CommentBlockComponent {
  @Input() name!: string;
  @Input() message!: string;
  @Input() createdAt!: string;
}
