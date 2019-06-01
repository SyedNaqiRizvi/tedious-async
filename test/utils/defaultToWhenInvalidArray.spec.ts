import { expect } from 'chai';
import { defaultToWhenInvalidArray } from '../../src/utils/utils';

const testCases = [
  {
    name: 'should default to array when input is null',
    defaultToValue: [],
    input: null,
    expectedOutput: [],
  },
  {
    name: 'should default to array when input is undefined',
    defaultToValue: [],
    input: undefined,
    expectedOutput: [],
  },
  {
    name: 'should default to array when input is object',
    defaultToValue: [],
    input: {},
    expectedOutput: [],
  },
  {
    name: 'should default to {} when input is object',
    defaultToValue: {},
    input: {},
    expectedOutput: {},
  },
  {
    name: 'should not default to value when input is valid array',
    defaultToValue: {},
    input: [],
    expectedOutput: [],
  },
  {
    name: 'should not default to value when input is valid array with values',
    defaultToValue: {},
    input: [1, 2, 3],
    expectedOutput: [1, 2, 3],
  },
  {
    name: 'should not default to value when input is valid array instance',
    defaultToValue: {},
    input: new Array(1, 2, 3),
    expectedOutput: [1, 2, 3],
  },
];

describe('Utils', () => {
  describe('defaultToWhenInvalidArray()', () => {
    testCases.forEach(test => {
      it(test.name, () => {
        const output = defaultToWhenInvalidArray(
          test.defaultToValue,
          test.input,
        );
        expect(output).to.eql(test.expectedOutput);
      });
    });
  });
});
