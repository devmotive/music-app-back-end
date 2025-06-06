const routes = (handlers) => [
  {
    method: 'POST',
    path: '/users',
    handler: handlers.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handlers.getUserByIdHandler,
  },
];

module.exports = routes;
