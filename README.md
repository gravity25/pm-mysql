### pm-mysql
A mysql wrapper that returns promisified results

## Usage
```js
const pmMysql = require('pm-mysql');

pmMysql.mysqlWithPromise(connection, sql, bindings)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```