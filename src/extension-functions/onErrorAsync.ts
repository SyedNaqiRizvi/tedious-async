import Connection from '../index';

const onErrorAsync = (connection: Connection) => (): Promise<
  Connection | Error
> =>
  new Promise((resolve, reject) => {
    connection.on('error', error => {
      if (error) {
        reject(error);
      }
      resolve(connection);
    });
  });

export default onErrorAsync;
