import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends React.Component {
  render() {
    const { favorites, loading, onChangeMusic } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {loading && <Loading />}
          <h2>Músicas Favoritas</h2>
          { favorites.map((music) => (

            <div key={ music.trackId }>
              <MusicCard
                music={ music }
                trackName={ music.trackName }
                trackId={ music.trackId }
                previewUrl={ music.previewUrl }
                checked={ favorites ? favorites
                  .some((musicEl) => musicEl.trackId === music.trackId) : false }
                onChangeMusic={ (event) => onChangeMusic(event, music) }
              />
            </div>

          ))}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  loading: PropTypes.bool,
  favorites: PropTypes.shape,
  onChangeMusic: PropTypes.func,
}.isRequired;
