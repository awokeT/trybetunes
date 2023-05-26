import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class CardBuilder extends React.Component {
  onLoading = (target) => {
    const { pathname } = target;
    onLoadingAlbum(pathname);
  }

  render() {
    const { elementos } = this.props;
    return (
      <div>
        {elementos.map((element) => (
          <div key={ element.collectionId }>
            <img
              src={ element.artworkUrl100 }
              alt={ element.artistId }
            />
            <h2>
              Album
              { element.collectionName }
            </h2>
            <p>
              Artista
              { element.artistName }
            </p>

            <Link
              data-testid={ `link-to-album-${element.collectionId}` }
              to={ `/album/${element.collectionId}` }
            >
              Album
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

CardBuilder.propTypes = {
  elementos: PropTypes.arrayOf(PropTypes.shape),
}.isRequired;
