import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {ImmPost} from '../models/post';
import {List} from 'immutable';

@Component({
  selector: 'app-catalog-thumbnail',
  templateUrl: './catalog-thumbnail.component.html',
  styleUrls: ['./catalog-thumbnail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogThumbnailComponent implements OnInit {
  @Input() op: ImmPost;
  @Input() subject: string;
  @Input() threadNumber: number;
  @Input() catalogReplies: List<ImmPost>;
  baseUrl = 'http://localhost:8080';

  constructor() { }

  ngOnInit() {
  }

}
