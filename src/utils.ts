import { DbColumn, DbRow, Dictionary } from './types';

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

const isArrayAndNotNil = (value: any): boolean =>
  value && value instanceof Array;

const defaultTo = <T>(isValidFn: (value: any) => boolean) => (
  defaultValue: any,
  value: T,
): T => (isValidFn(value) ? value : defaultValue);

const defaultToWhenInvalidArray: <T>(
  defaultValue: any,
  value: T,
) => T = defaultTo(isArrayAndNotNil);

export { mapSQLRowsToJSONList, mapSQLRowToJSON, addColumnAsJSONField };
