var mongoose = require('mongoose'),
    readLine = require('readline'),
    dbURI = 'mongodb://localhost/Loc8r',
    gracefulShutdown;

mongoose.connect(dbURI);

/* Mensagens de conexão com o MongoDB */
mongoose.connection.on('connected', function(){
   console.log('Mongoose connected to '+ dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: '+ err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});
/* Mensagens de conexão com o MongoDB */

/*
 * Verificando se o sistema é windows para habilitar o readLine
 * que escuta se a conexão do MongoDB foi fechada, se for sistema Unix
 * isso já ocorre automaticamente.
 */
if(process.platform == 'win32'){
    var rl = readLine.createInterface({
       input: process.stdin,
       output: process.stdout
    });

    rl.on('SIGINT', function(){
        process.emit('SIGINT');
    });
}

/*
 *Função para fechar a conexão e enviar mensagens de fechamendo do MongoDB
 */
gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through '+ msg);
        callback();
    });
};

/* Para os reinícios do nodemon */
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
       process.kill(process.pid, 'SIGUSR2');
    });
});

/* Para o encerramento da aplicação */
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
       process.exit(0);
    });
});

/* Para o encerramento da aplicação no Heroku */
process.on('SIGTERM', function() {
   gracefulShutdown('Heroku app shutdown', function() {
     process.exit(0);
   });
});

require('./locations');
