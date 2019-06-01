import { Connection as TediousConnection, Request } from 'tedious';
import { DbRow, Dictionary } from '../types';
import { getJsonMapperMethod, getSqlResult } from '../utils/execSqlUtils';

const execSqlAsync = (connection: TediousConnection) => (
  sqlString: string,
): Promise<Dictionary> =>
  new Promise((resolve, reject) => {
    const request = new Request(
      sqlString,
      (error: Error, rowCount: number, rows: DbRow[]) => {
        if (error) {
          reject(error);
        }
        const mapSqlToJSON = getJsonMapperMethod(rowCount);
        resolve(mapSqlToJSON(getSqlResult(rowCount, rows)));
      },
    );
    connection.execSql(request);
  });

export default execSqlAsync;
