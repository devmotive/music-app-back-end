const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newSong = {
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
      createdAt,
      updatedAt,
    };
    this._songs.push(newSong);

    const isSuccess = this._songs.some((song) => song.id === id);
    if (!isSuccess) {
      throw new InvariantError('Failed to add song');
    }

    return id;
  }

  getAllSongs() {
    return this._songs;
  }

  getSongsByAlbumId(albumId) {
    return this._songs
      .filter((song) => song.albumId === albumId)
      .map(({ id, title, performer }) => ({ id, title, performer }));
  }

  getSongById(id) {
    const song = this._songs.find((s) => s.id === id);
    if (!song) {
      throw new NotFoundError('Song not found');
    }
    return song;
  }

  editSongById(id, { title, performer, albumId }) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new NotFoundError('Failed to update song. ID not found');
    }

    const updatedAt = new Date().toISOString();
    this._songs[index] = {
      ...this._songs[index],
      title,
      performer,
      albumId,
      updatedAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new NotFoundError('Failed to delete song. ID not found');
    }
    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;
