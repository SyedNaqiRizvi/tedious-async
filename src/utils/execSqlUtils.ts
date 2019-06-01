import { Request } from 'tedious';
import { DbRow, Dictionary } from '../types';
import { mapSQLRowsToJSONList, mapSQLRowToJSON } from './sqlToJsonUtils';
import { defaultToWhenInvalidArray } from './utils';

const getSqlResult = (rowCount: number, rows: DbRow[]): DbRow[] | DbRow =>
  rowCount === 1 ? rows[0] : defaultToWhenInvalidArray([], rows);

const getJsonMapperMethod = (
  rowCount: number,
): ((rows: DbRow[] | DbRow) => Dictionary[] | Dictionary) =>
  rowCount === 1 ? mapSQLRowToJSON : mapSQLRowsToJSONList;

export { getJsonMapperMethod, getSqlResult };
