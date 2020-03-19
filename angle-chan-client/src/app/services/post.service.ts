import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {InputPost} from '../models/post';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = environment.apiUrl + 'fileAccess/post';
  constructor(private http: HttpClient) { }
  post(post: InputPost, captcha: string) {

    const params = new HttpParams().set('captcha', captcha)
    return this.http.post(this.baseUrl, post, {params});
  }
}
