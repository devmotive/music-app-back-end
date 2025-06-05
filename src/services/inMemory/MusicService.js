const { nanoid } = require('nanoid');

class MusicService {
  constructor() {
    this._albums = [];
    this._songs = [];
  }

  // Album methods
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
      throw new Error('Failed to add album');
    }

    return id;
  }

  getAllAlbums() {
    return this._albums;
  }

  getAlbumById(id) {
    const album = this._albums.find((a) => a.id === id);
    if (!album) {
      throw new Error('Album not found');
    }
    return album;
  }

  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new Error('Failed to update album. ID not found');
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
      throw new Error('Failed to delete album. ID not found');
    }
    this._albums.splice(index, 1);
  }

  // Song methods
  addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16);
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
      throw new Error('Failed to add song');
    }

    return id;
  }

  getAllSongs() {
    return this._songs;
  }

  getSongById(id) {
    const song = this._songs.find((s) => s.id === id);
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  }

  editSongById(id, { title, performer, albumId }) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new Error('Failed to update song. ID not found');
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
      throw new Error('Failed to delete song. ID not found');
    }
    this._songs.splice(index, 1);
  }
}

module.exports = MusicService;
