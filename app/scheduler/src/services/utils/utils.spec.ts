import * as utils from './index';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('toNumber', () => {
  it('should be defined', () => {
    expect(utils.toNumber).toBeInstanceOf(Function);
  });

  it.each([
    ['£1,500.89', 1500.89],
    ['2,500.89$', 2500.89],
    ['  3,500.89$', 3500.89],
    ['some 43 string', null],
    ['£36.09/mo', null],
    [undefined as unknown as string, null],
    ['', null],
  ])('should return the converted number or null', (input, expected) => {
    expect(utils.toNumber(input)).toBe(expected);
  });
});
