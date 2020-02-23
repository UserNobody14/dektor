import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ThreadState, ThreadStateModel } from './thread.state';
import { ImmThread } from 'src/app/models/thread';
import {Set} from 'immutable';

describe('Thread state', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([ThreadState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(ThreadState.getState);
        const expected: ThreadStateModel = {
          thread: new ImmThread({}),
          pageNumber: 0,
          alreadyInlinedPosts: Set([])
        };
        expect(actual).toEqual(expected);
    });

});
