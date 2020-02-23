import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {GetThreadsForBoardAction} from '../state/catalog/catalog.actions';
import {ImmThread} from '../models/thread';
import {List} from 'immutable';
import {CatalogState} from '../state/catalog/catalog.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {

  @Select(CatalogState.threads) threads: Observable<List<ImmThread>>;

  constructor(public route: ActivatedRoute, public store: Store) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      data => {
        if (data.get('board')) {
          console.log('here component', data.get('board'));
          this.store.dispatch(new GetThreadsForBoardAction(data.get('board')));
        }
      }
    );
  }

}
