'use strict';

/**
 * check connection and run mysql query
 * @param {Object} mysql - This is a mysql driver created through pool
 * @param {string} sql - This is a mysql query 
 * @param {Object} [bindings] - This is a mysql optional params
 */
exports.mysqlWithPromise = function (mysql, sql, bindings) {

    let params = bindings || {};

    return new Promise(function (resolve, reject) {
        // check if mysql connection is valid
        if (!mysql || typeof (mysql.getConnection) !== 'function') {
            return reject('Invalid mysql connection given!');
        }
        // get mysql connection
        mysql.getConnection(function (err, connection) {
            if (err) {
                if (connection) {
                    connection.release();
                }
                return reject(err);
            }
            // run mysql query
            connection.query(sql, params, function (err, rows) {
                if (err) {
                    if (connection) {
                        connection.release();
                    }
                    return reject(err);
                }
                connection.release();
                if (rows && rows.length) {
                    return resolve(rows);
                } else {
                    return resolve([]);
                }
            });
        });
    });
};