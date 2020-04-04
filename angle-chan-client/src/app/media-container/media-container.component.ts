import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ImmMediaInfo} from '../models/media-container';
import {List} from 'immutable';

@Component({
  selector: 'app-media-container',
  templateUrl: './media-container.component.html',
  styleUrls: ['./media-container.component.css']
})
export class MediaContainerComponent implements OnInit {
  // baseUrl = 'http://localhost:8080';
  baseUrl = 'api/';
  // @Input() displayedMedia: ImmMediaInfo;
  @Input() mediaListing: List<ImmMediaInfo>;
  // @Input() title: string;
  // @Input() imageSize: string;
  // @Input() thumbnailLink: string;
  // @Input() fullsizeLink: string;
  // @Input() height: string;
  // @Input() width: string;

  constructor() { }

  ngOnInit() {
  }
  contentLengthKbFn(value: number) {
    return value < 1000 ? `${value} bytes` :
      value < 1000000 ?  `${Math.floor(value / 1000)} kb` :
        `${value / 1000000} Mb`;
  }

}
