
module.exports = function(app){

    
    app.route('/api/cats').get((req, res) =>{

        app.app.controllers.musics.getMusics(app,req,res);
        
 
    });

    

};  
