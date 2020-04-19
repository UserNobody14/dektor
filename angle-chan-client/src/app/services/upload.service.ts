import {Inject, Injectable} from '@angular/core';
import {forkJoin, merge, Observable, partition, Subject} from 'rxjs';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {List} from 'immutable';
import {environment} from '../../environments/environment';
import {UploadObserver} from '../models/upload-observer';
import {MediaContainer} from '../models/media-container';
import {filter, map} from 'rxjs/operators';

// const url = '/api';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})
export class UploadService {
  private readonly url = environment.apiUrl + '/fileAccess/files';
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  public upload(files: List<File>, postNum: number):
    { [key: string]: { progress: Observable<number> } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach((file, num) => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', `${this.url}/${postNum}/${num}`, formData, {
        reportProgress: true,
        headers: new HttpHeaders({Accept: '*\/*'})
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
  public uploadObserved(files: List<File>, postNum: number): UploadObserver {
    return files.reduce((reduction: UploadObserver, file, key) => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const req = new HttpRequest('POST', `${this.url}/${postNum}/${key}`, formData, {
        reportProgress: true,
        headers: new HttpHeaders({Accept: '*\/*'})
      });
      // const progress = new Subject<number>();
      // const mediaContainer = new Subject<MediaContainer>();
      const [observable, completed] = partition(
        this.http.request<MediaContainer>(req), val => val.type === HttpEventType.UploadProgress
      );
      const newCompleted: Observable<MediaContainer> = completed.pipe(
        filter(a => a.type === HttpEventType.Response),
        map(a => a.type === HttpEventType.Response
        ? a.body : null)
    );
      const newItem: Observable<MediaContainer[]> = reduction.mediaContainer ?
        forkJoin([newCompleted, reduction.mediaContainer]).pipe(
          map(([cur, old]) => {
            return old.concat(cur);
          })) : newCompleted.pipe(
            map(a => [a])
        );
      return {
        map: reduction.map.set(file.name, observable.pipe(
          map(a => Math.round('loaded' in a ? 100 * a.loaded / a.total : 0))
        )),
        mediaContainer: newItem
      };
    }, {
      map: new Map<string, Observable<number>>(),
      mediaContainer: null
    });
  }
}
