import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardBuilder from '../components/CardBuilder';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      disabledButton: true,
      loading: false,
      filterAlbums: [],
      artist: '',
      message: '',
      message1: '',
    };
  }

  // Funçoes acima do render...
  // onLoadingAlbum = (target) => {
  //   const { pathname } = target;
  //   this.setState({
  //     redirect: true,
  //     pathname,
  //   });
  // }

  keyPressed = (value) => {
    const { code } = value;
    const { disabledButton } = this.state;
    if (code === 'Enter' && disabledButton === false) {
      return this.onButtonClick();
    }
  }

  onChangeInput = (input) => {
    const { target } = input;
    this.setState({
      search: target.value,
    }, () => this.checkInput());
  }

  checkInput = () => {
    const { search } = this.state;
    const number = 2;
    if (search.length >= number) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  onButtonClick = async () => {
    const { search } = this.state;
    this.setState({
      loading: true,
    });
    const resultSearch = await searchAlbumsAPI(search);
    this.setState({
      filterAlbums: resultSearch,
      loading: false,
      search: '',
      artist: search,
      message1: 'Resultado de álbuns de: ',
      message: 'Nenhum álbum foi encontrado',
    });
  }

  render() {
    const { onChangeInput, onButtonClick, keyPressed } = this;
    const { disabledButton, loading,
      search, filterAlbums, artist, message, message1 } = this.state;

    return (
      <main id="container-geral">

        <div data-testid="page-search">
          <Header />
          {loading ? (<Loading />) : (
            <div>
              <form>
                <input
                  type="text"
                  value={ search }
                  onChange={ onChangeInput }
                  data-testid="search-artist-input"
                  onKeyDown={ keyPressed }
                />
                <button
                  onClick={ onButtonClick }
                  data-testid="search-artist-button"
                  type="submit"
                  disabled={ disabledButton }
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )}
        </div>
        <div>
          {filterAlbums.length === 0 ? (<h2>{ message }</h2>) : (
            <>
              <div>
                <h1>
                  {message1}
                  {artist}
                </h1>
              </div>
              <div>
                <CardBuilder elementos={ filterAlbums } />
              </div>
            </>)}
        </div>
      </main> // fim do container geral
    );
  }
}
