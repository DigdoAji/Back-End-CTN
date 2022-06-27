const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const ArticleRoutes = require('./routes/articleRoutes');
const EventRoutes = require('./routes/eventRoutes');
const AdminRoutes = require('./routes/adminRoutes');
const admins = require('./data/admin');
 
const init = async () => {
  const server = Hapi.server({
    port: 3030,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
      },
    },
  });

  await server.register([
    {
      plugin: require('@hapi/cookie'),
    },
  ]);

  server.auth.strategy('login', 'cookie', {
    cookie: {
        name: 'sid-CTN-API',
        password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
        isSecure: false,
        ttl: 24 * 60 * 60 * 1000,
    },
    redirectTo: false,
    validateFunc: async (request, login) => {
        const account = await admins.find((user) => (user.id === login.id));
        if (!account) {
            return { valid: false };
        }
        return { valid: true, credentials: account };
    },
  });

  server.auth.default('login');

  server.route(ArticleRoutes);
  server.route(EventRoutes);
  server.route(AdminRoutes);

  mongoose.connect('mongodb+srv://digdoajiasrowi:cultureandtournusantara@cluster0.7ard82m.mongodb.net/?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Connection with database succeeded.');
  });
 
  await server.start();
  console.log(`Server running in ${server.info.uri}`);
};
 
init();