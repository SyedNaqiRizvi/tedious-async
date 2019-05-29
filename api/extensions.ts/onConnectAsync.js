"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onConnectAsync = (connection) => new Promise((resolve, reject) => {
    connection.on('connect', err => {
        if (err) {
            reject(err);
        }
        resolve(connection);
    });
});
exports.onConnectAsync = onConnectAsync;
//# sourceMappingURL=onConnectAsync.js.map