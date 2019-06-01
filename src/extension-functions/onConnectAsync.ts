import { Connection as TediousConnection } from 'tedious';

const onConnectAsync = (connection: TediousConnection) =>
  new Promise((resolve, reject) => {
    connection.on('connect', error => {
      if (error) {
        reject(error);
      }
      resolve(connection);
    });
  });

export default onConnectAsync;
