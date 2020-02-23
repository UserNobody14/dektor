import { ContainsNumberPipe } from './contains-number.pipe';

describe('ContainsNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new ContainsNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
