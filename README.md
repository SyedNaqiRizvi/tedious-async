# Tedious Async

An ES6 Typescript async/await wrapper around the tedious library.

# Details

This package includes several extension functions that can be used with async/await as well as all other original tedious functinoality. As a utility, all query extension functions return SQL data as JSON with column name as field name and the column value as field value.

Additional Details:
* Last updated: May 31, 2019
* Dependencies: tedious

# Installation

> npm install --save tedious-async

# Usage

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
        const onConnectResult = await connection.onConnect();
        return connection;
    } catch (error) {
        throw error;
    }
};
```

## execSqlAsync

Here is an example of how you can use the execSqlAsync.
Origin synchronous implementation: https://tediousjs.github.io/tedious/api-connection.html#function_execSql

```
const getAllUsers = async() => {
    const users = await execSqlAsync("select * from owners;");
    return users;
};
```
