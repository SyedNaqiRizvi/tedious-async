import Connection from '../../index';
import { InfoMessage } from '../types';

const onErrorMessageAsync = (
  connection: Connection,
) => (): Promise<InfoMessage | void> =>
  new Promise((resolve, reject) => {
    connection.on('errorMessage', (error: Error | InfoMessage) => {
      if (!error) {
        reject(error);
      }
      resolve((error as any) as InfoMessage);
    });
  });

export default onErrorMessageAsync;
