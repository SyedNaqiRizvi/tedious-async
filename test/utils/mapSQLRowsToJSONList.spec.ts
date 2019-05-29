import { expect } from 'chai';
import { DbRow, Dictionary } from '../../src/types';
import * as utils from '../../src/utils';

interface TestCase {
  name: string;
  input: DbRow[];
  expectedOutput: Dictionary[];
}

const testCases: TestCase[] = [
  {
    name:
      'should return multiple lists of objects with colNames mapped to field names and values mapped to values',
    input: [
      [
        {
          value: 'value1',
          metadata: {
            colName: 'field1',
          },
        },
      ],
      [
        {
          value: 'value2',
          metadata: {
            colName: 'field2',
          },
        },
      ],
    ],
    expectedOutput: [
      {
        field1: 'value1',
      },
      {
        field2: 'value2',
      },
    ],
  },
  {
    name:
      'should return multiple fields with colNames mapped to field names and values mapped to values',
    input: [
      [
        {
          value: 'value1',
          metadata: {
            colName: 'field1',
          },
        },
        {
          value: 'value2',
          metadata: {
            colName: 'field2',
          },
        },
      ],
    ],
    expectedOutput: [
      {
        field1: 'value1',
        field2: 'value2',
      },
    ],
  },
  {
    name:
      'should return multiple lists of objects with colNames mapped to field names and values mapped to values',
    input: [
      [
        {
          value: 'value1',
          metadata: {
            colName: 'field1',
          },
        },
      ],
      [
        {
          value: 'value2',
          metadata: {
            colName: 'field2',
          },
        },
      ],
    ],
    expectedOutput: [
      {
        field1: 'value1',
      },
      {
        field2: 'value2',
      },
    ],
  },
  {
    name: 'should return empty list when given empty list of empty list',
    input: [[]],
    expectedOutput: [{}],
  },
  {
    name: 'should return empty list when given empty list',
    input: [],
    expectedOutput: [],
  },
  {
    name: 'should return empty list when given null',
    input: null,
    expectedOutput: [],
  },
  {
    name: 'should return empty list when given undefined',
    input: undefined,
    expectedOutput: [],
  },
  {
    name: 'should return empty list when given value that is not array',
    input: {} as DbRow[],
    expectedOutput: [],
  },
];

describe('mapSQLRowsToJSONList()', () => {
  testCases.forEach(testCase => {
    it(testCase.name, () => {
      const output = utils.mapSQLRowsToJSONList(testCase.input);
      expect(output).to.eql(testCase.expectedOutput);
    });
  });
});
