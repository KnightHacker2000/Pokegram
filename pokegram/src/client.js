import axios from 'axios';
import reAuthenticate from './services/authHelper';

class PokemonClient {
  BACKEND_URL = 'http://localhost:8080';

  /**
   * Generic Get request method
  */
  async get(endpoint, params) {
    return axios
      .get(this.BACKEND_URL + endpoint, {
        params,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,REQUEST,PATCH',
          Authorization: (sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        reAuthenticate(error);
        throw error;
      });
  }

  /**
   * Generic Post request method
  */
  async post(
    endpoint,
    body,
    axiosParams
  ) {
    return axios
      .post(this.BACKEND_URL + endpoint, body, {
        ...axiosParams,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,REQUEST,PATCH',
          Authorization: (sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        reAuthenticate(error);
        throw (error);
      });
  }

  /**
   * Generic Put request method
  */
  async put(
    endpoint,
    body,
    axiosParams
  ) {
    return axios
      .put(this.BACKEND_URL + endpoint, body, {
        ...axiosParams,
        headers: {
          'Content-Type': 'application/json',
          Authorization: (sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        reAuthenticate(error);
        throw (error);
      });
  }

  /**
   * Generic Delete request method
  */
  async delete(
    endpoint,
    params
  ) {
    axios.defaults.headers.common.Authorization = (sessionStorage.getItem('app-token') !== null) ? sessionStorage.getItem('app-token') : null;
    return axios
      .delete(this.BACKEND_URL + endpoint, {
        params
      })
      .then((response) => response.data)
      .catch((error) => {
        reAuthenticate(error);
        throw (error);
      });
  }
}

export default PokemonClient;
