/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

class PokemonClient {
  BACKEND_URL = 'http://localhost:8000';

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
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,REQUEST,PATCH'
        }
      })
      .then((response) => response.data)
      .catch((error) => {
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
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => response.data)
      .catch((error) => {
        throw (error);
      });
  }
}

export default PokemonClient;
