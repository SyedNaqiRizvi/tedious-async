import { Connection as TediousConnection } from 'tedious';

type DbRow = DbColumn[];

interface DbColumn {
  value: any[];
  metadata: DbColumnMeta;
}

interface DbColumnMeta {
  colName: string;
}

interface Dictionary {
  [key: string]: any;
}

interface Connection extends TediousConnection {
  execSqlAsync: <T>(
    connection: TediousConnection,
  ) => (sqlString: string) => Promise<T>;
}

export { DbRow, DbColumn, DbColumnMeta, Dictionary, Connection };
