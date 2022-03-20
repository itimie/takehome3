import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  tempurl = 'http://localhost:3333';

  constructor(private httpClient: HttpClient) {}

  submitComment(name: string, message: string) {
    this.httpClient.post(`${this.tempurl}/createComment`, {
      name: name,
      message: message,
    }).pipe(take(1)).subscribe();
  }

  getComments(): Observable<unknown>{
    return this.httpClient.get(`${this.tempurl}/getComment`);
  }
}
