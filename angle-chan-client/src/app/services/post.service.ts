import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InputPost} from '../models/post';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = environment.apiUrl + 'fileAccess/post';
  constructor(private http: HttpClient) { }
  post(post: InputPost) {
    return this.http.post(this.baseUrl, post);
  }
}
