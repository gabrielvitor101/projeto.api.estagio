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
          `SELECT  M.NAME,M.IMAGE,G.STR_GENRE,A.STR_ARTIST,M.LINK
          FROM MUSICBD M JOIN  GENRE G ON(M.COD_GENRE=G.COD_GENRE)
          
          INNER JOIN ARTIST A ON (M.COD_ARTIST = A.COD_ARTIST)
            `,
             // bind value for :id
          )
          .then(function(result) {
            res.send(result);
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

app.route('/api/cats/:name/:uf').get((req, res) => {
  let requestedName = findAndReplace(req.params['name']);
  let requestedUf = req.params['uf'];
  oracledb.getConnection(

    {
      user: "bdextensao",
      password: "ipiranga",
      connectString: "localhost/orcl"
    })
    .then(function(conn) {
      return conn.execute(
      `SELECT *
      FROM PROCONBASE
      WHERE STRRAZAOSOCIAL = :nome AND UF = :uf`,
      [requestedName,requestedUf],  // bind value for :nome
      )
      .then(function(result) {
        dados=result.rows;
        
        // dados2 = result.rows[0][5];
        // console.log(dados);
        // console.log(dados2);
        // console.log(result.rows[0]);
        res.send(dados);
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

function findAndReplace(name) {
  length = name.length;
  for (var i = 0; i < length; i++) {
    name = name.replace("@", "/").replace("_"," ");
    
  }
  return name;

  
};

app.route('/api/count/cats').get((req, res) => {
  
  oracledb.getConnection(

        {
          user: "bdextensao", // Usuário do Oracle DB
          password: "ipiranga", // Senha do Oracle DB
          connectString: "localhost/orcl" // Host e Banco de dados do Oracle DB
        })
        .then(function(conn) {
          return conn.execute(
          `SELECT COUNT (*)   
          FROM PROCONBASE
          WHERE STRRAZAOSOCIAL LIKE :nome
          `,
            ['%BANCO BRADESCO%'],  // bind value for :id
          )
          .then(function(result) {
            console.log(result.rows);
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

app.route('/api/cats/count/:name/:uf').get((req, res) => {
  let requestedName = findAndReplace(req.params['name']);
  let requestedUf = req.params['uf'];
  oracledb.getConnection(

    {
      user: "bdextensao",
      password: "ipiranga",
      connectString: "localhost/orcl"
    })
    .then(function(conn) {
      return conn.execute(
      `SELECT COUNT (*)
      FROM PROCONBASE
      WHERE STRRAZAOSOCIAL = :nome AND UF = :uf`,
      [requestedName,requestedUf],  // bind value for :nome
      )
      .then(function(result) {
        count=result.rows;
        // dados2 = result.rows[0][5];
        // console.log(dados);
        // console.log(dados2);
        // console.log(result.rows[0]);
        console.log(count);
        res.send(count);
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



function findAndReplace(name) {
  length = name.length;
  for (var i = 0; i < length; i++) {
    name = name.replace("@", "/").replace("_"," ");
    
  }
  return name;

  
};

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