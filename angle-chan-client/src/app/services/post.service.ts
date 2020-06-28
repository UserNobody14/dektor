import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {InputPost} from '../models/post';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = environment.apiUrl + 'fileAccess/post';
  private readonly threadUrl = environment.apiUrl + 'fileAccess/createThread';
  constructor(private http: HttpClient) { }
  post(post: InputPost, thread: number, captcha: string): Observable<InputPost> {
    const emptypost: InputPost[] = [];
    const outPost: InputPost = {...post, thread: {number: thread, subject: '', posts: emptypost, board: {boardName: ''}}};
    const params = new HttpParams().set('captcha', captcha);
    return this.http.post<InputPost>(this.baseUrl, outPost, {params});
  }
  postThread(post: InputPost, subject: string, boardName: string, captcha: string): Observable<InputPost> {
    const emptypost: InputPost[] = [];
    const outPost: InputPost = {...post, thread: {number: null, subject, posts: emptypost, board: {boardName}}};
    const params = new HttpParams().set('captcha', captcha);
    return this.http.post<InputPost>(this.threadUrl + `/${boardName}`, outPost, {params});
  }
}
