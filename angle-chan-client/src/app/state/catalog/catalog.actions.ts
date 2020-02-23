export class CatalogAction {
  public static readonly type = '[Catalog] Add item';
  constructor(public payload: string) { }
}
export class GetThreadsForBoardAction {
    public static readonly type = '[GetThreadsForBoard] Gets threads for a board';
    constructor(public payload: string) { }
 }
export class SuccessfullyGotThreadsForBoardAction {
    public static readonly type = '[SuccessfullyGotThreadsForBoard] Successfully retrieved all threads';
    constructor(public threads: string) { }
 }
