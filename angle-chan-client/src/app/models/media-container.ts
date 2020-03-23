import {Record} from 'immutable';
type MediaTypes =  'webm' | 'image' | 'cbz' | 'text' | 'music' | string;

export interface MediaContainer {
  thumbnail: Thumbnail;
  // thumbnailHeight: string;
  // thumbnailWidth: string;
  mediaSizeKb: string;
  info: MediaInfo;
  // fullUrl: string;
  // fullHeight: string;
  // fullWidth: string;
  title: string;
  mediaType: MediaTypes;
}
export interface Thumbnail {
  link: number;
  height: number;
  width: number;
  contentLen: number;
}
export interface MediaInfo {
  link: number;
  height: number;
  width: number;
  contentLength: number;

}
const mediaRecord = Record<MediaContainer>({
  thumbnail: {link: 0, height: 0, width: 0, contentLen: 0},
  // thumbnailHeight: '',
  // thumbnailWidth: '',
  mediaSizeKb: '',
  title: '',
  info:  {link: 0, height: 0, width: 0, contentLength: 0},
  // fullUrl: '',
  // fullHeight: '',
  // fullWidth: '',
  mediaType: 'image'
});

export class ImmMediaInfo extends mediaRecord implements MediaContainer {
  constructor(media: Partial<MediaContainer>) {
    super(media);
  }

}
