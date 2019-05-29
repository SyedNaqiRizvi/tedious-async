"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tedious_1 = require("tedious");
const utils_1 = require("../utils");
const execSqlAsync = (connection) => (sqlString) => new Promise((resolve, reject) => {
    const request = new tedious_1.Request(sqlString, (err, rowCount, rows) => {
        if (err) {
            reject(err);
        }
        else {
            const sqlResult = getSqlResult(rowCount, rows);
            const mapSqlToJSON = getJsonMapperMethod(rowCount);
            resolve(mapSqlToJSON(sqlResult));
        }
    });
    connection.execSql(request);
});
exports.execSqlAsync = execSqlAsync;
const getSqlResult = (rowCount, rows) => rowCount > 1 ? rows : rows[0];
const getJsonMapperMethod = (rowCount) => rowCount > 1 ? utils_1.mapSQLRowsToJSONList : utils_1.mapSQLRowToJSON;
//# sourceMappingURL=execSqlAsync.js.map