import { Connection as TediousConnection, Request } from 'tedious';
import { DbRow, Dictionary } from '../types';
import { mapSQLRowsToJSONList, mapSQLRowToJSON } from '../utils';

const execSqlAsync = (connection: TediousConnection) => (
  sqlString: string,
): Promise<Dictionary> =>
  new Promise((resolve, reject) => {
    const request = new Request(
      sqlString,
      (err: Error, rowCount: number, rows: DbRow[]) => {
        if (err) {
          reject(err);
        } else {
          const sqlResult = getSqlResult(rowCount, rows);
          const mapSqlToJSON = getJsonMapperMethod(rowCount);
          resolve(mapSqlToJSON(sqlResult));
        }
      },
    );

    connection.execSql(request);
  });

const getSqlResult = (rowCount: number, rows: DbRow[]): DbRow[] | DbRow =>
  rowCount > 1 ? rows : rows[0];

const getJsonMapperMethod = (
  rowCount: number,
): ((rows: DbRow[] | DbRow) => Dictionary[] | Dictionary) =>
  rowCount > 1 ? mapSQLRowsToJSONList : mapSQLRowToJSON;

export { execSqlAsync };
