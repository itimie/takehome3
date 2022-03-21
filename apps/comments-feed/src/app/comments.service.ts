import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  interval,
  Observable, startWith, switchMap, tap
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
      });
  }

  getComments(): Observable<any> {
    return this.httpClient.get(`${this.tempurl}/getComments`);
  }
}
