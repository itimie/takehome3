import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  of,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  tempurl = 'http://localhost:3333';
  triggerload = new BehaviorSubject(true);

  constructor(private httpClient: HttpClient) {}

  //can use an intercepter to handle some errors like 500, 504 etc..

  submitComment(name: string, message: string): Observable<any> {
    return this.httpClient.post(`${this.tempurl}/createComment`, {
      name: name,
      message: message,
    });
  }

  getComments(): Observable<any> {
    return this.triggerload.asObservable().pipe(
      filter((canLoad) => !!canLoad),
      switchMap(() => this.httpClient.get(`${this.tempurl}/getComments`)),
      catchError((e) => {
        //dispatch error
        return of([]);
      })
    );
  }

  deleteComments(): Observable<any> {
    return this.httpClient.delete(`${this.tempurl}/deleteComments`).pipe(
      catchError((e) => {
        //dispatch error
        return of([]);
      })
    );
  }
}
