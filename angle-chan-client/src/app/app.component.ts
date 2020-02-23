import { Component, OnInit } from '@angular/core';
// import { selectPostList } from './store/selectors/post.selectors';
// import { select, Store } from '@ngrx/store';
// import { IAppState } from './store/state/app.state';
// import { GetPosts } from './store/actions/post.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angle-chan-client';
  // posts$ = this.store.pipe(select(selectPostList));
  // constructor(private store: Store<IAppState>) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.store.dispatch(new GetPosts());
  }
}
