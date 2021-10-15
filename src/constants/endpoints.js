const searchUrl = process.env.REACT_APP_SEARCH_URL;

const endpoints = {
  SEARCH: {
    GET_SEARCH_SERVICE: (query) =>
      `${searchUrl}/search/repositories?q=${query}&language=javascript`,
  },
};

export default endpoints;
