export class ThreadAction {
    public static readonly type = '[Thread] Add item';
    constructor(public payload: any) { }
}
export class PostToThread {
  static readonly type = '[Thread] PostToThread]';
  constructor(public readonly payload?: any) {}
}
export class GetNextPage {
  static readonly type = '[Thread] GetNextPage]';
  constructor(public readonly payload?: any) {}
}
export class GetPostsForThread {
  static readonly type = '[Thread] GetPostsForThread]';
  constructor(public readonly payload: number) {}
}
export class ShowReplyInPost {
  static readonly type = '[Thread] ShowReplyInPost]';
  constructor(public readonly post: number, public readonly reply: number) {}
}
export class UnShowReplyInPost {
  static readonly type = '[Thread] UnShowReplyInPost]';
  constructor(public readonly post: number, public readonly reply: number) {}
}
export class InlineReply {
  static readonly type = '[Thread] InlineReply]';
  constructor(public readonly post: number, public readonly reply: number) {}
}
export class RemoveInliningForReply {
  static readonly type = '[Thread] RemoveInliningForReply]';
  constructor(public readonly post: number, public readonly reply: number) {}
}

