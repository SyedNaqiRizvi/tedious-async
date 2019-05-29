"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tedious_1 = require("tedious");
const execSqlAsync_1 = require("./extensions.ts/execSqlAsync");
const onConnectAsync_1 = require("./extensions.ts/onConnectAsync");
class Connection extends tedious_1.Connection {
    constructor() {
        super(...arguments);
        this.execSqlAsync = execSqlAsync_1.execSqlAsync(this);
        this.onConnectAsync = onConnectAsync_1.onConnectAsync(this);
    }
}
exports.default = Connection;
//# sourceMappingURL=index.js.map