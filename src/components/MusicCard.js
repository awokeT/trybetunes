import React from 'react';
import PropTypes from 'prop-types';

export default class musicCard extends React.Component {
  onChange = async (event, music) => {
    const { checked } = event.target;
    const { onChangeMusic } = this.props;
    onChangeMusic(checked, music);
  }

  render() {
    const {
      music,
      trackName,
      trackId,
      previewUrl,
      checked,
    } = this.props;

    return (
      <>

        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ (event) => this.onChange(event, music) }
            checked={ checked }
          />
        </label>

      </>
    );
  }
}

musicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  musics: PropTypes.object,
  checked: PropTypes.bool,
  trackId: PropTypes.string,
  onChangeMusic: PropTypes.func,
}.isRequired;
