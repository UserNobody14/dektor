import { State, Action, Selector, StateContext } from '@ngxs/store';
import {CatalogAction, GetThreadsForBoardAction} from './catalog.actions';
import {ImmThread} from '../../models/thread';
import {List} from 'immutable';
import {CatalogService} from '../../services/catalog.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

export interface CatalogStateModel {
  board: string;
  threads: List<ImmThread>;
}

@State<CatalogStateModel>({
  name: 'catalog',
  defaults: {
    board: '',
    threads: List<ImmThread>([])
  }
})
@Injectable()
export class CatalogState {
  constructor(private catalogService: CatalogService) { }

  @Selector()
  public static getState(state: CatalogStateModel) {
    return state;
  }
  @Selector()
  public static threads(state: CatalogStateModel) {
    return state.threads;
  }

  @Action(GetThreadsForBoardAction)
  public getThreadsForBoardAction(
      { patchState }: StateContext<CatalogStateModel>,
      { payload }: GetThreadsForBoardAction
      ) {
   return this.catalogService.testGetThreadsForBoard(payload).pipe(
      tap((threads: List<ImmThread>) => {
        console.log('here state', threads.get(0).toJS());
        patchState({threads, board: payload});
      })
    );
  }

  // @Action(CatalogAction)
  // public add(ctx: StateContext<CatalogStateModel>, { payload }: CatalogAction) {
  //   const stateModel = ctx.getState();
  //   stateModel.items = [...stateModel.items, payload];
  //   ctx.setState(stateModel);
  // }
}
