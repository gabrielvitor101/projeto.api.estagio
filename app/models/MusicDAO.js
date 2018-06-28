function MusicDAO (connection){
    this._connection = connection;
}

MusicDAO.prototype.getMusics = function ( callback) {

    this._connection.then(function (conn) {
        conn.execute(
            `SELECT  M.NAME,M.IMAGE,G.STR_GENRE,A.STR_ARTIST,M.LINK
            FROM MUSICBD M JOIN  GENRE G ON(M.COD_GENRE=G.COD_GENRE)
            
            INNER JOIN ARTIST A ON (M.COD_ARTIST = A.COD_ARTIST) `,[],{outFormat:conn.OBJECT},callback)


    })
};

module.exports = function(){
    return MusicDAO; 
  }