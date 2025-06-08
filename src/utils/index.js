const mapDBToAlbumModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapDBToSongModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});

const mapDBToPlaylistModel = ({ id, name, username }) => ({
  id,
  name,
  username,
});

const mapDBToPlaylistSongModel = ({ id, name, username }, songs) => ({
  id,
  name,
  username,
  songs,
});

module.exports = {
  mapDBToAlbumModel,
  mapDBToSongModel,
  mapDBToPlaylistModel,
  mapDBToPlaylistSongModel,
};
