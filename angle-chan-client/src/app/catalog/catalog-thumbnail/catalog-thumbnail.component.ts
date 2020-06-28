import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ImmPost} from '../../models/post';
import {List} from 'immutable';
import {MediaContainer} from '../../models/media-container';

@Component({
  selector: 'app-catalog-thumbnail',
  templateUrl: './catalog-thumbnail.component.html',
  styleUrls: ['./catalog-thumbnail.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class CatalogThumbnailComponent implements OnInit {
  @Input() op: ImmPost;
  @Input() opMedia: MediaContainer;
  @Input() subject: string;
  @Input() threadNumber: number;
  @Input() catalogReplies: List<ImmPost>;
  baseUrl = 'api/';

  constructor() { }

  ngOnInit() {
  }
  toDateTime(value) {
    // op.media?.get(0)?.thumbnail?.
    return new Date(value).getTime();
  }
}
