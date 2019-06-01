import { DbColumn, DbRow, Dictionary } from '../types';
import { defaultToWhenInvalidArray } from './utils';

const mapSQLRowsToJSONList = (rows: DbRow[]): Dictionary[] =>
  defaultToWhenInvalidArray([], rows).map(mapSQLRowToJSON);

const mapSQLRowToJSON = (row: DbRow): Dictionary =>
  defaultToWhenInvalidArray([], row).reduce(addColumnAsJSONField, {});

const addColumnAsJSONField = (
  jsonRow: Dictionary,
  column: DbColumn,
): Dictionary => ({
  ...jsonRow,
  [column.metadata.colName]: column.value,
});

export { mapSQLRowsToJSONList, mapSQLRowToJSON, addColumnAsJSONField };
