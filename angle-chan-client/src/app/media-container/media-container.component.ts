import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import {ImmMediaInfo} from '../models/media-container';

@Component({
  selector: 'app-media-container',
  templateUrl: './media-container.component.html',
  styleUrls: ['./media-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaContainerComponent implements OnInit {
  // baseUrl = 'http://localhost:8080';
  baseUrl = 'api/';
  @Input() media: ImmMediaInfo;
  // @Input() title: string;
  // @Input() imageSize: string;
  // @Input() thumbnailLink: string;
  // @Input() fullsizeLink: string;
  // @Input() height: string;
  // @Input() width: string;

  constructor() { }

  ngOnInit() {
  }

}
