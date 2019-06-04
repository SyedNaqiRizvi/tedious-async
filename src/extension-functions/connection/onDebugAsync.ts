import Connection from '../../index';

const onDebugAsync = (connection: Connection) => (): Promise<string | void> =>
  new Promise((resolve, reject) => {
    connection.on('debug', (messageText: string) => {
      if (!messageText) {
        reject(messageText);
      }
      resolve(messageText);
    });
  });

export default onDebugAsync;
