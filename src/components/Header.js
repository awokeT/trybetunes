import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount = async () => {
    const userName = await (getUser());
    this.setState({
      userName: userName.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <div>
        {loading ? (<Loading />) : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">
              { userName }
            </p>
            <Link data-testid="link-to-search" to="/search">Search</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          </header>)}
      </div>
    );
  }
}
