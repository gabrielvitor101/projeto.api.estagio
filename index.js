const express = require('express');
const app = express();
const server = require('http').createServer(app);

// const script = require('./infra/myscript.js');
var oracledb = require('oracledb');

app.route('/api/cats').get((req, res) => {
  
  oracledb.getConnection(

        {
          user: "bdextensao", // Usuário do Oracle DB
          password: "ipiranga", // Senha do Oracle DB
          connectString: "localhost/orcl" // Host e Banco de dados do Oracle DB
        })
        .then(function(conn) {
          return conn.execute(
          `SELECT STRRAZAOSOCIAL  
          FROM PROCONBASE
          WHERE STRRAZAOSOCIAL LIKE :nome`,
            ['%BRADESCO%'],  // bind value for :id
          )
          .then(function(result) {
            res.send(result.rows);
            return conn.close();
          })
          .catch(function(err) {
            console.error(err);
            return conn.close();
          });
      })
      .catch(function(err) {
        console.error(err);
      });
    
});

// app.get('/', function (req, res) {
    
//   console.log("Entrou na funçaõ");
//   var rs;
//   oracledb.getConnection(

//     {
//       user: "bdextensao", // Usuário do Oracle DB
//       password: "ipiranga", // Senha do Oracle DB
//       connectString: "localhost/orcl" // Host e Banco de dados do Oracle DB
//     })
//     .then(function(conn) {
//       return conn.execute(
//       `SELECT STRRAZAOSOCIAL  
//       FROM PROCONBASE
//       WHERE STRRAZAOSOCIAL LIKE :nome`,
//         ['%BRADESCO%'],  // bind value for :id
//       )
//       .then(function(result) {
//         res.send(result);
//         return conn.close();
//       })
//       .catch(function(err) {
//         console.error(err);
//         return conn.close();
//       });
//   })
//   .catch(function(err) {
//     console.error(err);
//   });



    // result.json(script.teste);
    // console.log("Entrou na rota ");
    // q.all([script.teste()]).then(results => {
    //     console.log("Saiu");
    //     console.log(results);
    //     result.json(results[0])
    // });
    // result.json(script.teste);

// });

//Ouvindo no localhost:8000.
server.listen(8000, function () {
    console.log('Servidor ouvindo na porta 8000!');
});