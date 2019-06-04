import Connection from '../../index';

const onConnectAsync = (connection: Connection) => (): Promise<
  Connection | Error
> =>
  new Promise((resolve, reject) => {
    connection.on('connect', (error: Error) => {
      if (error) {
        reject(error);
      }
      resolve(connection);
    });
  });

export default onConnectAsync;
