import Connection from '../../index';

const onLanguageChangeAsync = (connection: Connection) => (): Promise<
  string | void
> =>
  new Promise((resolve, reject) => {
    connection.on('languageChange', (languageName: string) => {
      if (!languageName) {
        reject(languageName);
      }
      resolve(languageName);
    });
  });

export default onLanguageChangeAsync;
