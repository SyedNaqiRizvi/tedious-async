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

## Creating a new instance

```
import Connection from 'tedious-async';
const config: ConnectionConfig = {
    // Tedious configurations
};

const connection = new Connection(config);
```

## onConnect

Here is an example of how you can use the onConnect implementation asynchronously.
Origin implementation for reference: https://tediousjs.github.io/tedious/api-connection.html#event_connect

```
import { Connection, ConnectionConfig } from 'tedious-async';
const config: ConnectionConfig = {
    // Tedious configurations
};

const dbConnection = async(config: ConnectionConfig):  => {
    const connection = new Connection(config);
    try {
        const onConnectResult = await connection.onConnectAsync();
        return onConnectResult;
    } catch (error) {
        throw error;
    }
};
```

## onError

Here is an example of how you can use the onError implementation asynchronously.
Origin implementation for reference: https://tediousjs.github.io/tedious/api-connection.html#event_error

```
import { Connection, ConnectionConfig } from 'tedious-async';
const config: ConnectionConfig = {
    // Tedious configurations
};

const dbConnection = async(config: ConnectionConfig):  => {
    const connection = new Connection(config);
    try {
        const onErrorResult = await connection.onErrorAsync();
        return onErrorResult;
    } catch (error) {
        throw error;
    }
};
```

## execSqlAsync

Here is an example of how you can use the execSqlAsync.
Origin synchronous implementation: https://tediousjs.github.io/tedious/api-connection.html#function_execSql

### Options

Options is an object where you can specify any additional transformation you want on the returned data.
Current supported options are:

- format - with possible values "json" for json response or "default" for default tedious return type

```
// import connection from "..."

const options = { format: 'json' };
const getAllUsers = async() => {
try {
const users = await connection.execSqlAsync("select * from users;", options);
return users;
} catch (error) {
// handle error
}
};
```
