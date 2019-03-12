const Actions = {
  GET_USER: "GET_USER",
  GET_USER_REPOS: "GET_USER_REPOS",
  GET_DATA: "GET_DATA",
  GET_DATA_FAILURE: "GET_DATA_FAILURE"
};

const getUserData = data => {
  return {
    type: Actions.GET_USER,
    data
  };
};

const getUserRepos = data => {
  return {
    type: Actions.GET_USER_REPOS,
    data
  };
};

export { Actions, getUserData, getUserRepos };
