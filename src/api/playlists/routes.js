const routes = (handlers) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handlers.postPlaylistHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handlers.getPlaylistsHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handlers.deletePlaylistByIdHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handlers.postPlaylistSongHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handlers.getPlaylistSongsHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handlers.deletePlaylistSongByIdHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
];

module.exports = routes;
