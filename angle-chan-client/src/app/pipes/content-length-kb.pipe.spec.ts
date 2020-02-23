import { ContentLengthKbPipe } from './content-length-kb.pipe';

describe('ContentLengthKbPipe', () => {
  it('create an instance', () => {
    const pipe = new ContentLengthKbPipe();
    expect(pipe).toBeTruthy();
  });
});
