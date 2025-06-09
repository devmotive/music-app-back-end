class AlbumsHandler {
  constructor(service, songsService, storageService, validator) {
    this._service = service;
    this._songsService = songsService;
    this._storageService = storageService;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    this.likeAlbumHandler = this.likeAlbumHandler.bind(this);
    this.unlikeAlbumHandler = this.unlikeAlbumHandler.bind(this);
    this.getLikesCountForAlbumHandler = this.getLikesCountForAlbumHandler.bind(this);
    this.postCoverAlbumHandler = this.postCoverAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name = 'untitled', year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album added successfully',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    const songs = await this._songsService.getSongsByAlbumId(id);

    return {
      status: 'success',
      data: {
        album: {
          ...album,
          songs,
        },
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album updated successfully',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album deleted successfully',
    };
  }

  async likeAlbumHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    const albumLikeId = await this._service.likeAlbum(credentialId, id);

    const response = h.response({
      status: 'success',
      message: 'Album liked successfully',
      data: {
        albumLikeId,
      },
    });
    response.code(201);
    return response;
  }

  async unlikeAlbumHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.unlikeAlbum(credentialId, id);

    const response = h.response({
      status: 'success',
      message: 'Album unliked successfully',
    });
    response.code(200);
    return response;
  }

  async getLikesCountForAlbumHandler(request) {
    const { id } = request.params;
    const like = await this._service.getLikesCountForAlbum(id);

    console.log('Like count for album:', like); // Add this line for debugging

    return {
      status: 'success',
      data: {
        like,
      },
    };
  }

  async postCoverAlbumHandler(request, h) {
    const { id } = request.params;
    const { cover } = request.payload;

    if (!cover || !cover.hapi) {
      throw new Error('Invalid file upload payload');
    }

    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);

    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/albums/covers/${filename}`;

    await this._service.editAlbumCoverUrl(id, coverUrl);

    const response = h.response({
      status: 'success',
      message: 'Album cover added successfully',
    });
    response.code(201);
    return response;
  }
}

module.exports = AlbumsHandler;
