import Connection from '../../index';

const onEndAsync = (connection: Connection) => (): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.on('end', () => {
      resolve();
    });
  });

export default onEndAsync;
