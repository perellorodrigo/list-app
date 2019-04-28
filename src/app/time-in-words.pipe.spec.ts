import { TimeInWordsPipe } from './time-in-words.pipe';

describe('TimeInWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeInWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
