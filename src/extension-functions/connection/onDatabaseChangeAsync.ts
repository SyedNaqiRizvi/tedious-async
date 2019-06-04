import Connection from '../../index';

const onDatabaseChangeAsync = (connection: Connection) => (): Promise<
  string | void
> =>
  new Promise((resolve, reject) => {
    connection.on('databaseChange', (databaseName: string) => {
      if (!databaseName) {
        reject(databaseName);
      }
      resolve(databaseName);
    });
  });

export default onDatabaseChangeAsync;
