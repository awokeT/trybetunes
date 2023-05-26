import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
// import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.callApi();
    // this.getFavorites();
  }

  callApi = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const result = await getMusics(id);
    this.setState({
      musics: result,
    });
  }

  render() {
    const { musics } = this.state;
    const { favorites, loading, onChangeMusic } = this.props;

    return (
      <div data-testid="page-album">
        <Header />
        {loading && <Loading />}
        <div>
          <h1 data-testid="artist-name">{ musics[0]?.artistName }</h1>
          <h2 data-testid="album-name">{ musics[0]?.collectionName }</h2>
        </div>
        { musics.map((music) => (
          music.kind === 'song' ? (
            <div key={ music.trackId }>
              <MusicCard
                music={ music }
                trackName={ music.trackName }
                trackId={ music.trackId }
                previewUrl={ music.previewUrl }
                checked={ favorites ? favorites
                  .some((musicEl) => musicEl.trackId === music.trackId) : false }
                onChangeMusic={ onChangeMusic }
                favorites={ favorites }
              />
            </div>
          )
            : ('')
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  loading: PropTypes.bool,
  favorites: PropTypes.shape,
  onChangeMusic: PropTypes.func,
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
