function login(email: any, password: any, callback: any) {
    //this example uses the "pg" library
    //more info here: https://github.com/brianc/node-postgres
  
    const bcrypt = require('bcrypt');
    const postgres = require('pg');

     class WrongUsernameOrPasswordError extends Error {
        constructor(public email?: string) {
          super("Usuario o contraseña incorrectos");
          this.name = "WrongUsernameOrPasswordError";
        }
    }
  
    const conString = 'postgres://';
    postgres.connect(conString, function (err:any , client: any, done: any) {
      if (err) return callback(err);
  
      const query = 'SELECT id, name, email, password FROM users WHERE email = $1';
      client.query(query, [email], function (err: any, result: any) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        done();
  
        if (err || result.rows.length === 0) return callback(err || new WrongUsernameOrPasswordError(email));
  
        const user = result.rows[0];
  
        bcrypt.compare(password, user.password, function (err: any, isValid: any) {
          if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
  
          return callback(null, {
            user_id: user.id,
            name: user.name,
            email: user.email
          });
        });
      });
    });
  }

  
  