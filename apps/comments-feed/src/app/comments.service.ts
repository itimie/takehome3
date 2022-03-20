import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  Observable,
  of, switchMap, tap
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  tempurl = 'http://localhost:3333';
  triggerload = new BehaviorSubject(true);

  constructor(private httpClient: HttpClient) {}

  submitComment(name: string, message: string): Observable<any> {
    return this.httpClient
      .post(`${this.tempurl}/createComment`, {
        name: name,
        message: message,
      })
      .pipe(
        tap((response) => {
          if (response) {
            this.triggerload.next(true);
          } else{
            this.triggerload.next(false);
          }
        })
      );
  }

  getComments(): Observable<any> {
    return of(this.triggerload.asObservable()).pipe(
      filter((canLoad) => !!canLoad),
      switchMap(() => this.httpClient.get(`${this.tempurl}/getComments`))
    );
  }
}
