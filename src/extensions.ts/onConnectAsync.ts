import { Connection as TediousConnection } from 'tedious';

const onConnectAsync = (connection: TediousConnection) =>
  new Promise((resolve, reject) => {
    connection.on('connect', err => {
      if (err) {
        reject(err);
      }
      resolve(connection);
    });
  });

export { onConnectAsync };
