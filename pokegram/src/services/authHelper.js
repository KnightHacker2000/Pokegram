/**
   * Generic reauth helper method
  */
const reAuthenticate = (error) => {
  // console.log(typeof error.response.status);
  if (error.response.status && error.response.status === 401) {
    // delete the token
    sessionStorage.removeItem('app-token');
    // reload the app
    sessionStorage.setItem('logout', true);
    window.location.reload(true);
  }
};

export default reAuthenticate;
