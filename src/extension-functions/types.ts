interface execSqlAsyncOptions {
  format?: string | execSqlAsyncDataFormat;
}

enum execSqlAsyncDataFormat {
  default = 'default',
  json = 'json',
}

export { execSqlAsyncOptions, execSqlAsyncDataFormat };
