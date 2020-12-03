const mysql = require('mysql');

class Mysql {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.MYSQL_DB,
    });
  }

  query(queryString) {
    const pool = this.pool;

    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          console.log('error while getting connection', err);
          return reject(err);
        }

        // Use the connection
        connection.query(queryString, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();

          // Handle error after the release.
          if (error) {
            return reject(error);
          }

          return resolve(results);

          // Don't use the connection here, it has been returned to the pool.
        });
      });
    });
  }

}

module.exports = new Mysql();
