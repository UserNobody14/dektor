import {Observable} from 'rxjs';
import {MediaContainer} from './media-container';

export interface UploadObserver {
  map: Map<string, Observable<number>>;
  mediaContainer: Observable<MediaContainer[]>;
}
