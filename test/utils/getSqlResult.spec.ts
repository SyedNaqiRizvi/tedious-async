import { expect } from 'chai';
import { DbRow } from '../../src/types';
import { getSqlResult } from '../../src/utils/execSqlUtils';

const testCases = [
  {
    name: 'should default to array when rowCount is null',
    rowCount: null,
    rows: [],
    expectedOutput: [],
  },
  {
    name:
      'should default to array when rowCount is more than 1 and rows is null',
    rowCount: 3,
    rows: null,
    expectedOutput: [],
  },
  {
    name: 'should default to array when rowCount is undefined',
    rowCount: undefined,
    rows: [],
    expectedOutput: [],
  },
  {
    name:
      'should default to array when rowCount is more than 1 and rows is undefined',
    rowCount: 3,
    rows: undefined,
    expectedOutput: [],
  },
  {
    name: 'should return rows when rowCount is more than 1 and rows has values',
    rowCount: 3,
    rows: [1, 2, 3],
    expectedOutput: [1, 2, 3],
  },
  {
    name: 'should return rows when rowCount is less than 1 and rows has values',
    rowCount: 0,
    rows: [1, 2, 3],
    expectedOutput: [1, 2, 3],
  },
  {
    name: 'should return row when rowCount is 1 and rows has one value',
    rowCount: 1,
    rows: [1],
    expectedOutput: 1,
  },
];

describe('Utils', () => {
  describe('getSqlResult()', () => {
    testCases.forEach(test => {
      it(test.name, () => {
        const output = getSqlResult(
          test.rowCount,
          (test.rows as any) as DbRow[],
        );
        expect(output).to.eql(test.expectedOutput);
      });
    });
  });
});
