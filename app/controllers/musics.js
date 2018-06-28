module.exports.getMusics = function(app,req,res){

    var connection = app.config.dbConnection();
    var MusicDAO = new app.app.models.MusicDAO(connection);

    MusicDAO.getMusics(function(err, result) {
        res.send( result.rows )
    })
}