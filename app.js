var app = require('./config/server')
const server = require('http').createServer(app);

// var rotaMusic = require('./app/routes/musicas')(app);

// var rotaNoticias = require('./app/routes/noticias')(app);

// var rotaHome = require('./app/routes/home')(app);

// var rotaForInclusaoNoticia = require('./app/routes/formulario_inclusao_noticia')(app);


server.listen(8000, function(){
    console.log('Servidor ON');
});

