import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { addSong, removeSong, getFavoriteSongs } from './services/favoriteSongsAPI';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorites: favoriteSongs,
    });
  }

  onChangeMusic = async (checked, music) => {
    const { favorites } = this.state;
    this.setState({ loading: true });

    if (!checked) {
      await removeSong(music);
      this.setState({
        favorites: favorites.filter((el) => el.trackId !== music.trackId),
      });
    } else {
      await addSong(music);
      this.setState((prev) => ({
        favorites: [...prev.favorites, music],
      }));
    }
    this.setState({ loading: false });
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route
          exact
          path="/album/:id"
          render={ (props) => (
            <Album
              { ...props }
              onChangeMusic={ this.onChangeMusic }
              loading={ loading }
              favorites={ favorites }
            />
          ) }
        />
        <Route
          exact
          path="/favorites"
          render={ (props) => (
            <Favorites
              { ...props }
              onChangeMusic={ this.onChangeMusic }
              loading={ loading }
              favorites={ favorites }
            />
          ) }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}
