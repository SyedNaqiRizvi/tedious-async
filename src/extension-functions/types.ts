interface execSqlAsyncOptions {
  format?: string | execSqlAsyncDataFormat;
}

enum execSqlAsyncDataFormat {
  default = 'default',
  json = 'json',
}

interface InfoMessage {
  number: number; // Error number
  state: string; // The error state, used as a modifier to the error number.
  class: number; // The class (severity) of the error. A class of less than 10 indicates an informational message.
  message: string; // The message text.
  procName: string; // The stored procedure name (if a stored procedure generated the message).
  lineNumber: number; // The line number in the SQL batch or stored procedure that caused the error. Line numbers begin at 1; therefore, if the line number is not applicable to the message, the value of LineNumber will be 0.
}

export { execSqlAsyncOptions, execSqlAsyncDataFormat, InfoMessage };
