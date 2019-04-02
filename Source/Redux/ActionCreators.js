const GET_USER = "GET_USER";
const GET_USER_REPOS = "GET_USER_REPOS";
const GET_DATA = "GET_DATA";
const GET_DATA_FAILURE = "GET_DATA_FAILURE";

const getUserData = data => {
  return {
    type: GET_USER,
    data
  };
};

const getUserRepos = data => {
  return {
    type: GET_USER_REPOS,
    data
  };
};

export {
  GET_DATA,
  GET_DATA_FAILURE,
  GET_USER,
  GET_USER_REPOS,
  getUserData,
  getUserRepos
};
