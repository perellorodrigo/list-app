import { TimeFromNowPipe } from './time-from-now.pipe';

describe('TimeFromNowPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFromNowPipe();
    expect(pipe).toBeTruthy();
  });
});
