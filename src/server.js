const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs');
const MusicService = require('./services/inMemory/MusicService');

const init = async () => {
  const musicService = new MusicService();
  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: musicService,
      },
    },
    {
      plugin: songs,
      options: {
        service: musicService,
      },
    },
  ]);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
