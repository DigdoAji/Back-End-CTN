const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const routes = require('./routes');
 
const init = async () => {
    const server = Hapi.server({
        port: 3030,
        host: 'localhost',
        routes: {
          cors: {
            origin: ['*'],
          },
        },
    });

    mongoose.connect('mongodb+srv://digdoajiasrowi:cultureandtournusantara@cluster0.7ard82m.mongodb.net/?retryWrites=true&w=majority', { 
      useNewUrlParser: true,
    });

    const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', () => {
        console.log('Connection with database succeeded.');
    });

  server.route(routes);
 
  await server.start();
  console.log(`Server running in ${server.info.uri}`);
};
 
init();