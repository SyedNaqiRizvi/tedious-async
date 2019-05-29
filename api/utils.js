"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapSQLRowsToJSONList = (rows) => rows.map(mapSQLRowToJSON);
exports.mapSQLRowsToJSONList = mapSQLRowsToJSONList;
const mapSQLRowToJSON = (row) => row.reduce(addColumnAsJSONField, {});
exports.mapSQLRowToJSON = mapSQLRowToJSON;
const addColumnAsJSONField = (jsonRow, column) => (Object.assign({}, jsonRow, { [column.metadata.colName]: column.value }));
exports.addColumnAsJSONField = addColumnAsJSONField;
//# sourceMappingURL=utils.js.map