var oracledb = require('oracledb');



var ConnOracle = function() {
  return oracledb.getConnection(
    
    {
      user: "bdextensao", // Usuário do Oracle DB
      password: "ipiranga", // Senha do Oracle DB
      connectString: "localhost/orcl" // Host e Banco de dados do Oracle DB
    })
};

module.exports = function(){
  return ConnOracle; 
}