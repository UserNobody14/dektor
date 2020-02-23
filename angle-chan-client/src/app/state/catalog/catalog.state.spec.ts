import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CatalogState, CatalogStateModel } from './catalog.state';
import { CatalogAction } from './catalog.actions';

describe('Catalog store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CatalogState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: CatalogStateModel = {
      items: ['item-1']
    };
    store.dispatch(new CatalogAction('item-1'));
    const actual = store.selectSnapshot(CatalogState.getState);
    expect(actual).toEqual(expected);
  });

});
