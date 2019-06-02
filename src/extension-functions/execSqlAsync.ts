import { Request } from 'tedious';
import Connection from '../index';
import { DbRow, Dictionary } from '../types';
import { mapSQLRows } from '../utils/sqlToJsonUtils';
import { execSqlAsyncOptions } from './types';

const execSqlAsync = (connection: Connection) => (
  sqlString: string,
  options?: execSqlAsyncOptions,
): Promise<Dictionary[] | Error> =>
  new Promise((resolve, reject) => {
    const request = new Request(
      sqlString,
      (error: Error, rowCount: number, rows: DbRow[]) => {
        if (error) {
          reject(error);
        }
        resolve(mapSQLRows(rows, options));
      },
    );
    connection.execSql(request);
  });

export default execSqlAsync;
