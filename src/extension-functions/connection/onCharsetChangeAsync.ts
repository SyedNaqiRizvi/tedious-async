import Connection from '../../index';

const onCharsetChangeAsync = (connection: Connection) => (): Promise<
  string | void
> =>
  new Promise((resolve, reject) => {
    connection.on('charsetChange', (charset: string) => {
      if (!charset) {
        reject(charset);
      }
      resolve(charset);
    });
  });

export default onCharsetChangeAsync;
