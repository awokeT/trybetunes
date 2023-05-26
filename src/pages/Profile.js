import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: [],
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const userDetails = await getUser();
    this.setState({
      user: userDetails,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? (<Loading />)
            : (
              <>
                <section>
                  <div>
                    <img data-testid="profile-image" src={ user.image } alt="user" />
                  </div>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <p>{user.description}</p>
                </section>
                <div>
                  <Link to="/profile/edit">Editar perfil</Link>
                </div>
              </>
            )
        }
      </div>
    );
  }
}
