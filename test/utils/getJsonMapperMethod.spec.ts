import { expect } from 'chai';
import { getJsonMapperMethod } from '../../src/utils/execSqlUtils';
import {
  mapSQLRowsToJSONList,
  mapSQLRowToJSON,
} from '../../src/utils/sqlToJsonUtils';

const testCases = [
  {
    name: 'should return mapSQLRowsToJSONList function when rowCount is null',
    rowCount: null,
    expectedOutput: mapSQLRowsToJSONList,
  },
  {
    name:
      'should return mapSQLRowsToJSONList function when rowCount is undefined',
    rowCount: undefined,
    expectedOutput: mapSQLRowsToJSONList,
  },
  {
    name:
      'should return mapSQLRowsToJSONList function when rowCount is a number more than 1',
    rowCount: 3,
    expectedOutput: mapSQLRowsToJSONList,
  },
  {
    name:
      'should return mapSQLRowsToJSONList function when rowCount is a number less than one',
    rowCount: 0,
    expectedOutput: mapSQLRowsToJSONList,
  },

  {
    name:
      'should return mapSQLRowToJSON function when rowCount is a number equal to one',
    rowCount: 1,
    expectedOutput: mapSQLRowToJSON,
  },
];

describe('Utils', () => {
  describe('getJsonMapperMethod()', () => {
    testCases.forEach(test => {
      it(test.name, () => {
        const output = getJsonMapperMethod(test.rowCount);
        expect(output).to.eql(test.expectedOutput);
      });
    });
  });
});
