import { DbColumn, DbRow, Dictionary } from './types';

const mapSQLRowsToJSONList = (rows: DbRow[]): Dictionary[] =>
  rows.map(mapSQLRowToJSON);

const mapSQLRowToJSON = (row: DbRow): Dictionary =>
  row.reduce(addColumnAsJSONField, {});

const addColumnAsJSONField = (
  jsonRow: Dictionary,
  column: DbColumn,
): Dictionary => ({
  ...jsonRow,
  [column.metadata.colName]: column.value,
});

export { mapSQLRowsToJSONList, mapSQLRowToJSON, addColumnAsJSONField };
