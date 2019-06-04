
# Tedious Async

An ES6 Typescript async/await wrapper around the tedious library (http://tediousjs.github.io/tedious/index.html).

# Details

This package includes several extension functions that can be used with async/await as well as all other original tedious functinoality. As a utility, all query extension functions have an option to return SQL data as JSON with column name as field name and the column value as field value returned as the javascript equivilant type.

Additional Details:
- Last updated: May 31, 2019
- Dependencies: tedious

# Installation

> npm install --save tedious-async

# Usage

  1. [Creating a new Instance](#creating-a-new-instance)
	    - [Configuration Model](#configuration-model)
	    - [Initialization](#initialization)
  2. [Connection Events](#connection)
		- [onConnectAsync](#onconnectasync)
		- [onEndAsync](#onendasync)
		- [onErrorAsync](#onerrorasync)
		- [onDebugAsync](#ondebugasync)
		- [onInfoMessageAsync](#oninfomessageasync)
		- [onErrorMessageAsync](#onerrormessageasync)
		- [onDatabaseChangeAsync](#ondatabasechangeasync)
		- [onLanguageChangeAsync](#onlanguagechangeasync)
	3. [Connection Operations](#connection-operations)
		- [execSqlAsync](#execsqlasync)

# Creating a new instance

## Configuration Model


| Field | Value |
|--|--|
| `server` | Hostname to connect to. |
| `authentication.type` | Type of the authentication method, valid types are  `default`,  `ntlm`,  `azure-active-directory-password` |
| `authentication.options.userName` | User name to use for authentication. |
| `authentication.options.password` | Password to use for authentication. |
| `authentication.options.domain` | Once you set domain for ntlm authentication type, driver will connect to SQL Server using domain login. |
| `options.port` | Port to connect to (default:  `1433`). Mutually exclusive with  `options.instanceName`. |
| `options.instanceName` | The instance name to connect to. The SQL Server Browser service must be running on the database server, and UDP port 1434 on the database server must be reachable.  (no default),  Mutually exclusive with  `options.port`. |
| `options.database` | Database to connect to (default: dependent on server configuration). |
| `options.fallbackToDefaultDb` | By default, if the database requested by  `options.database`  cannot be accessed, the connection will fail with an error. However, if  `options.fallbackToDefaultDb`  is set to  `true`, then the user's default database will be used instead (Default:  `false`). |
| `options.enableAnsiNullDefault` | If true,  `SET ANSI_NULL_DFLT_ON ON`  will be set in the initial sql. This means new columns will be nullable by default. See the  [T-SQL documentation](https://msdn.microsoft.com/en-us/library/ms187375.aspx)  for more details. (Default:  `true`). |
| `options.connectTimeout` | The number of milliseconds before the attempt to connect is considered failed (default:  `15000`). |
| `options.requestTimeout` | The number of milliseconds before a request is considered failed, or  `0`  for no timeout (default:  `15000`). |
| `options.cancelTimeout` | The number of milliseconds before the cancel (abort) of a request is considered failed (default:  `5000`). |
| `options.packetSize` | The size of TDS packets (subject to negotiation with the server). Should be a power of 2. (default:  `4096`). |
| `options.useUTC` | A boolean determining whether to pass time values in UTC or local time. (default:  `true`). |
| `options.abortTransactionOnError` | A boolean determining whether to rollback a transaction automatically if any error is encountered during the given transaction's execution. This sets the value for  `SET XACT_ABORT`  during the initial SQL phase of a connection ([documentation](http://msdn.microsoft.com/en-us/library/ms188792.aspx)). |
| `options.localAddress` | A string indicating which network interface (ip address) to use when connecting to SQL Server. |
| `options.useColumnNames` | A boolean determining whether to return rows as arrays or key-value collections. (default:  `false`). |
| `options.camelCaseColumns` | A boolean, controlling whether the column names returned will have the first letter converted to lower case (`true`) or not. This value is ignored if you provide a  `columnNameReplacer`. (default:  `false`). |
| `options.columnNameReplacer` | A function with parameters  `(columnName, index, columnMetaData)`  and returning a string. If provided, this will be called once per column per result-set. The returned value will be used instead of the SQL-provided column name on row and meta data objects. This allows you to dynamically convert between naming conventions. (default:  `null`). |
| `options.debug.packet`  | A boolean, controlling whether  `debug`  events will be emitted with text describing packet details (default:  `false`). |
| `options.debug.data` | A boolean, controlling whether  `debug`  events will be emitted with text describing packet data details (default:  `false`). |
| `options.debug.payload` | A boolean, controlling whether  `debug`  events will be emitted with text describing packet payload details (default:  `false`). |
| `options.debug.token` | A boolean, controlling whether  `debug`  events will be emitted with text describing token stream tokens (default:  `false`). |
| `options.isolationLevel` | The default isolation level that transactions will be run with. The isolation levels are available from  `require('tedious').ISOLATION_LEVEL` [`READ_UNCOMMITTED`, `READ_COMMITTED`, `REPEATABLE_READ`, `SERIALIZABLE`, `SNAPSHOT`] (default:  `READ_COMMITED`). |
| `options.connectionIsolationLevel` | The default isolation level that transactions will be run with. The isolation levels are available from  `require('tedious').ISOLATION_LEVEL` [`READ_UNCOMMITTED`, `READ_COMMITTED`, `REPEATABLE_READ`, `SERIALIZABLE`, `SNAPSHOT`] (default:  `READ_COMMITED`). |
|`options.readOnlyIntent`  | A boolean, determining whether the connection will request read only access from a SQL Server Availability Group. For more information, see  [here](http://msdn.microsoft.com/en-us/library/hh710054.aspx "Microsoft: Configure Read-Only Routing for an Availability Group (SQL Server)"). (default:  `false`). |
| `options.encrypt` | A boolean determining whether or not the connection will be encrypted. Set to  `true`  if you're on Windows Azure. (default:  `false`). |
| `options.cryptoCredentialsDetails` | When encryption is used, an object may be supplied that will be used for the first argument when calling  [tls.createSecurePair](http://nodejs.org/docs/latest/api/tls.html#tls_tls_createsecurepair_credentials_isserver_requestcert_rejectunauthorized)  (default:  `{}`). |
| `options.rowCollectionOnDone` | A boolean, that when true will expose received rows in Requests'  `done*`  events. See  [done](http://tediousjs.github.io/tedious/api-request.html#event_done),[doneInProc](http://tediousjs.github.io/tedious/api-request.html#event_doneInProc)  and  [doneProc](http://tediousjs.github.io/tedious/api-request.html#event_doneProc). (default:  `false`). Caution: If many row are received, enabling this option could result in excessive memory usage. |
| `options.rowCollectionOnRequestCompletion` | A boolean, that when true will expose received rows in Requests' completion callback. See  [new Request](http://tediousjs.github.io/tedious/api-request.html#function_newRequest). (default:  `false`). Caution: If many row are received, enabling this option could result in excessive memory usage. |
| `options.tdsVersion` | The version of TDS to use. If server doesn't support specified version, negotiated version is used instead. The versions are available from  `require('tedious').TDS_VERSION`. [`7_1`, `7_2`, `7_3_A`, `7_3_B`,`7_4` ]. (default:  `7_4`). |
| `options.connectionRetryInterval` | Number of milliseconds before retrying to establish connection, in case of transient failure. (default:  `500`) |
| `options.dateFormat` | A string representing position of month, day and year in temporal datatypes. (default:  `mdy`) |
| `options.enableAnsiNull` | A boolean, controls the way null values should be used during comparison operation. (default:  `true`) |
| `options.enableAnsiPadding` | A boolean, controls if padding should be applied for values shorter than the size of defined column. (default:  `true`) |
| `options.enableAnsiWarnings` | If true, SQL Server will follow ISO standard behavior during various error conditions. For details, see  [documentation](https://docs.microsoft.com/en-us/sql/t-sql/statements/set-ansi-warnings-transact-sql). (default:  `true`) |
| `options.enableConcatNullYieldsNull` | A boolean, determines if concatenation with NULL should result in NULL or empty string value, more details in  [documentation](https://docs.microsoft.com/en-us/sql/t-sql/statements/set-concat-null-yields-null-transact-sql). (default:  `true`) |
| `options.enableCursorCloseOnCommit` | A boolean, controls whether cursor should be closed, if the transaction opening it gets committed or rolled back. (default:  `false`) |
| `options.enableImplicitTransactions` | A boolean, sets the connection to either implicit or autocommit transaction mode. (default:  `false`) |
| `options.enableNumericRoundabort` | If false, error is not generated during loss of precession. (default:  `false`) |
| `options.enableQuotedIdentifier` | If true, characters enclosed in single quotes are treated as literals and those enclosed double quotes are treated as identifiers. (default:  `true`) |
| `options.appName` | Application name used for identifying a specific application in profiling, logging or tracing tools of SQL Server. (default:  `Tedious`) |

## Initialization
```
import Connection from 'tedious-async';

const config: ConnectionConfig = {
  // Tedious configurations
};

const connection = new Connection(config);
```

# Connection Events

## onConnectAsync

Here is an example of how you can use the onConnectAsync function. This returns a promise, when successful resolves the connection, when error rejects with Error.

Origin tedious documentation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_connect

```
try {
  const onConnectResult = await connection.onConnectAsync();
  return onConnectResult;
} catch (error) {
  throw error;
}
```

## onEndAsync

Here is an example of how you can use the onErrorAsync function. This returns a promise, when Error is returned it will resolve an Error, when nothing is returned the promise is rejected.

Origin implementation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_end

```
try {
	const onErrorResult = await connection.onErrorAsync();
	return onErrorResult;
} catch (error) {
	throw error;
}

```

## onErrorAsync

Here is an example of how you can use the onErrorAsync function. This returns a promise, when Error is returned it will resolve an Error, when nothing is returned the promise is rejected.

Origin implementation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_error

```
try {
	const onErrorResult = await connection.onErrorAsync();
	return onErrorResult;
} catch (error) {
	throw error;
}

```

## onDebugAsync

Here is an example of how you can use the onDebugAsync function. This returns a promise, when debug message is returned it will resolve the message text, when nothing is returned the promise is rejected.

Origin implementation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_debug

```
try {
	const onDebugResult = await connection.onDebugAsync();
	return onDebugResult;
} catch (error) {
	throw error;
}

```

## onInfoMessageAsync

Here is an example of how you can use the onInfoMessageAsync function. This returns a promise, when info message is returned it will resolve the info message object, when nothing is returned the promise is rejected.

Origin implementation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_infoMessage

#### Info Message Object Model
```
InfoMessage {
	number:  number; // Error number
	state:  string; // The error state, used as a modifier to the error number.
	class:  number; // The class (severity) of the error. A class of less than 10 indicates an informational message.
	message:  string; // The message text.
	procName:  string; // The stored procedure name (if a stored procedure generated the message).
	lineNumber:  number; // The line number in the SQL batch or stored procedure that caused the error. Line numbers begin at 1; therefore, if the line number is not applicable to the message, the value of LineNumber will be 0.
}
```
#### Implementation
```
try {
	const onInfoMessageResult = await connection.onInfoMessageAsync();
	return onInfoMessageResult;
} catch (error) {
	throw error;
}

```

## onErrorMessageAsync

Here is an example of how you can use the onErrorMessageAsync function. This returns a promise, when error message is returned it will resolve the error message object, when nothing is returned the promise is rejected.

Origin implementation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_errorMessage

#### Error Message Object Model
```
ErrorMessage {
	number:  number; // Error number
	state:  string; // The error state, used as a modifier to the error number.
	class:  number; // The class (severity) of the error. A class of less than 10 indicates an informational message.
	message:  string; // The message text.
	procName:  string; // The stored procedure name (if a stored procedure generated the message).
	lineNumber:  number; // The line number in the SQL batch or stored procedure that caused the error. Line numbers begin at 1; therefore, if the line number is not applicable to the message, the value of LineNumber will be 0.
}
```
#### Implementation
```
try {
	const onErrorMessageResult = await connection.onErrorMessageAsync();
	return onErrorMessageResult;
} catch (error) {
	throw error;
}
```

## onDatabaseChangeAsync

Here is an example of how you can use the onDatabaseChangeAsync function. This returns a promise, when database is changed (may be as a result of a successful login, or a `use` statement) it will resolve the name of the new database, when nothing is returned the promise is rejected.

Origin implementation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_databaseChange
```
try {
	const onDatabaseChangeResult = await connection.onDatabaseChangeAsync();
	return onDatabaseChangeResult;
} catch (error) {
	throw error;
}

```

## onLanguageChangeAsync

Here is an example of how you can use the onLanguageChangeAsync function. This returns a promise, when language is changed it will resolve with the new language string, when nothing is returned the promise is rejected.

Origin implementation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_languageChange
```
try {
	const onLanguageChangeResult = await connection.onLanguageChangeAsync();
	return onLanguageChangeResult;
} catch (error) {
	throw error;
}

```

## onCharsetChangeAsync

Here is an example of how you can use the onCharsetChangeAsync function. This returns a promise, when charset is changed it will resolve with the new charset string, when nothing is returned the promise is rejected.

Origin implementation for reference: http://tediousjs.github.io/tedious/api-connection.html#event_charsetChange
```
try {
	const onCharsetChangeResult = await connection.onCharsetChangeAsync();
	return onCharsetChangeResult;
} catch (error) {
	throw error;
}

```

# Connection Operations

## execSqlAsync

Here is an example of how you can use the execSqlAsync function. This returns a promise, when the sql query is successful it will return the result, when there is an error then the promise is rejected. There is an options object that you can pass the this function to transform the result of the operation such as having a list of json objects as the result.

Origin synchronous implementation: https://tediousjs.github.io/tedious/api-connection.html#function_execSql


### Options

| Name | Use | Possible Values |
|--|--|--|
| format | transforms the format of the returned result | [`json`, `default`] |


```
const options = { format: 'json' };
const getAllUsers = async() => {
	try {
		const users = await connection.execSqlAsync('select * from users;', options);
		return users;
	} catch (error) {
		throw(error)
	}
};
```

# Coming Soon
 * [connection.beginTransaction](http://tediousjs.github.io/tedious/api-connection.html#function_beginTransaction)
 * [connection.callProcedure](http://tediousjs.github.io/tedious/api-connection.html#function_callProcedure)
 * [connection.cancel](http://tediousjs.github.io/tedious/api-connection.html#function_cancel)
 * [connection.close](http://tediousjs.github.io/tedious/api-connection.html#function_close)
 * [connection.commitTransaction](http://tediousjs.github.io/tedious/api-connection.html#function_commitTransaction)
 * [connection.execSqlBatch](http://tediousjs.github.io/tedious/api-connection.html#function_execSqlBatch)
 * [connection.execBulkLoad](http://tediousjs.github.io/tedious/api-connection.html#function_execBulkLoad)
 * [connection.execute](http://tediousjs.github.io/tedious/api-connection.html#function_execute)
 * [connection.prepare](http://tediousjs.github.io/tedious/api-connection.html#function_prepare)
 * [connection.reset](http://tediousjs.github.io/tedious/api-connection.html#function_reset)
 * [connection.rollbackTransaction](http://tediousjs.github.io/tedious/api-connection.html#function_rollbackTransaction)
 * [connection.saveTransaction](http://tediousjs.github.io/tedious/api-connection.html#function_saveTransaction)
 * [connection.transaction](http://tediousjs.github.io/tedious/api-connection.html#function_transaction)
 * [connection.unprepare](http://tediousjs.github.io/tedious/api-connection.html#function_unprepare)
 * [connection.newBulkLoad](http://tediousjs.github.io/tedious/api-connection.html#function_newBulkLoad)