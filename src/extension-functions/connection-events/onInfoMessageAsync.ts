import Connection from '../../index';
import { InfoMessage } from '../types';

const onInfoMessageAsync = (
  connection: Connection,
) => (): Promise<InfoMessage | void> =>
  new Promise((resolve, reject) => {
    connection.on('infoMessage', (info: InfoMessage) => {
      if (!info) {
        reject(info);
      }
      resolve(info);
    });
  });

export default onInfoMessageAsync;
