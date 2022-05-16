import { TextSizePipe } from './text-size.pipe';

describe('TextSizePipe', () => {
  it('create an instance', () => {
    const pipe = new TextSizePipe();
    expect(pipe).toBeTruthy();
  });
  it('should transform the of a paragraph', () => {
    const pipe = new TextSizePipe();
    const transformResult = pipe.transform('0123456789', 2);
    expect(transformResult).toEqual('01...');
  });
});
