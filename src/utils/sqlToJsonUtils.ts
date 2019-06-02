import { ColumnValue } from 'tedious';
import {
  execSqlAsyncDataFormat,
  execSqlAsyncOptions,
} from '../extension-functions/types';
import { DbRow, Dictionary } from '../types';
import { defaultToWhenInvalidArray } from './utils';

const mapSQLRows = (
  rows: DbRow[],
  options?: execSqlAsyncOptions,
): Dictionary[] =>
  isDataFormatJSON(options)
    ? defaultToWhenInvalidArray([], rows).map(mapSQLRowToJSON)
    : rows;

const mapSQLRowToJSON = (row: DbRow): Dictionary =>
  defaultToWhenInvalidArray([], row).reduce(addColumnAsJSONField, {});

const addColumnAsJSONField = (
  jsonRow: Dictionary,
  column: ColumnValue,
): Dictionary => ({
  ...jsonRow,
  [column.metadata.colName]: column.value,
});

const isDataFormatJSON = (options?: execSqlAsyncOptions): boolean =>
  options && options.format === execSqlAsyncDataFormat.json;

export { mapSQLRows, mapSQLRowToJSON, addColumnAsJSONField };
