import Connection from '../../index';

const onErrorAsync = (connection: Connection) => (): Promise<Error> =>
  new Promise((resolve, reject) => {
    connection.on('error', (error: Error) => {
      if (!error) {
        reject(error);
      }
      resolve(error);
    });
  });

export default onErrorAsync;
