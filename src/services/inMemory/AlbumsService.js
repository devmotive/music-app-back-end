const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newAlbum = {
      id,
      name,
      year,
      createdAt,
      updatedAt,
    };
    this._albums.push(newAlbum);

    const isSuccess = this._albums.some((album) => album.id === id);
    if (!isSuccess) {
      throw new InvariantError('Failed to add album');
    }

    return id;
  }

  getAlbumById(id) {
    const album = this._albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundError('Album not found');
    }
    return album;
  }

  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundError('Failed to update album. ID not found');
    }

    const updatedAt = new Date().toISOString();
    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
      updatedAt,
    };
  }

  deleteAlbumById(id) {
    const index = this._albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundError('Failed to delete album. ID not found');
    }
    this._albums.splice(index, 1);
  }
}

module.exports = AlbumsService;
