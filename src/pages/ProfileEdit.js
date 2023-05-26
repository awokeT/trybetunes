import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      isDisabled: true,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const details = await getUser();
    this.setState({
      loading: false,
      name: details.name,
      email: details.email,
      image: details.image,
      description: details.description,
    }, () => this.verify());
  }

  insertData = (event) => {
    event.preventDefault();
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    }, () => this.verify());
  }

  verify = () => {
    const { name, image, description, email } = this.state;
    const number = 0;
    const pattern = /\S+@\S+.com/;
    if (name.length > number
      && image.length > number
      && description.length > number
      && email.length > number
      && pattern.test(email) === true) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  onClickButton = async (event) => {
    event.preventDefault();
    const { name, image, description, email } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await updateUser({
      name,
      email,
      image,
      description,
    });

    this.setState({ loading: false });
    history.push('/profile');
  }

  render() {
    const {
      name, email, image, description,
      loading, isDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading />
          : (
            <form>
              <input
                data-testid="edit-input-image"
                type="text"
                placeholder="Link da imagem"
                name="image"
                value={ image }
                onChange={ this.insertData }
                required
              />
              <input
                data-testid="edit-input-name"
                type="text"
                placeholder="Digite seu Nome"
                name="name"
                value={ name }
                onChange={ this.insertData }
                required
              />
              <input
                data-testid="edit-input-email"
                type="email"
                placeholder="Digite seu Email"
                name="email"
                value={ email }
                onChange={ this.insertData }
                required
              />
              <input
                data-testid="edit-input-description"
                type="text"
                placeholder="Escreva algo sobre você!"
                name="description"
                value={ description }
                onChange={ this.insertData }
                required
              />
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ isDisabled }
                onClick={ this.onClickButton }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape,
}.isRequired;
