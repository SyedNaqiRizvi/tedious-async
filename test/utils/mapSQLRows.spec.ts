import { expect } from 'chai';
import {
  execSqlAsyncDataFormat,
  execSqlAsyncOptions,
} from '../../src/extension-functions/types';
import { DbRow, Dictionary } from '../../src/types';
import * as utils from '../../src/utils/sqlToJsonUtils';

interface TestCase {
  name: string;
  input: DbRow[];
  expectedOutput: Dictionary[];
  options: execSqlAsyncOptions;
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
            type: {
              name: 'type',
            },
          },
        },
      ],
      [
        {
          value: 'value2',
          metadata: {
            colName: 'field2',
            type: {
              name: 'type',
            },
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
    options: {
      format: execSqlAsyncDataFormat.json,
    },
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
            type: {
              name: 'type',
            },
          },
        },
        {
          value: 'value2',
          metadata: {
            colName: 'field2',
            type: {
              name: 'type',
            },
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
    options: {
      format: execSqlAsyncDataFormat.json,
    },
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
            type: {
              name: 'type',
            },
          },
        },
      ],
      [
        {
          value: 'value2',
          metadata: {
            colName: 'field2',
            type: {
              name: 'type',
            },
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
    options: {
      format: execSqlAsyncDataFormat.json,
    },
  },
  {
    name: 'should return empty list when given empty list of empty list',
    input: [[]],
    expectedOutput: [{}],
    options: {
      format: execSqlAsyncDataFormat.json,
    },
  },
  {
    name: 'should return empty list when given empty list',
    input: [],
    expectedOutput: [],
    options: {
      format: execSqlAsyncDataFormat.json,
    },
  },
  {
    name: 'should return empty list when given null',
    input: null,
    expectedOutput: [],
    options: {
      format: execSqlAsyncDataFormat.json,
    },
  },
  {
    name: 'should return empty list when given undefined',
    input: undefined,
    expectedOutput: [],
    options: {
      format: execSqlAsyncDataFormat.json,
    },
  },
  {
    name: 'should return empty list when given value that is not array',
    input: {} as DbRow[],
    expectedOutput: [],
    options: {
      format: execSqlAsyncDataFormat.json,
    },
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
            type: {
              name: 'type',
            },
          },
        },
      ],
      [
        {
          value: 'value2',
          metadata: {
            colName: 'field2',
            type: {
              name: 'type',
            },
          },
        },
      ],
    ],
    expectedOutput: [
      [
        {
          value: 'value1',
          metadata: {
            colName: 'field1',
            type: {
              name: 'type',
            },
          },
        },
      ],
      [
        {
          value: 'value2',
          metadata: {
            colName: 'field2',
            type: {
              name: 'type',
            },
          },
        },
      ],
    ],
    options: {
      format: execSqlAsyncDataFormat.json,
    },
  },
];
describe('Utils', () => {
  describe('mapSQLRows()', () => {
    testCases.forEach(testCase => {
      it(testCase.name, () => {
        const output = utils.mapSQLRows(testCase.input, testCase.options);
        expect(output).to.eql(testCase.expectedOutput);
      });
    });
  });
});
