import { GET_USER, GET_USER_REPOS } from "./ActionCreators";

const initialState = {
  name: "",
  avatarUrl: "",
  repos: [],
  isSuccess: true
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        name: action.data.data.name,
        avatarUrl: action.data.data.avatar_url,
        message: action.data.data.message !== undefined ? false : true
      };
    case GET_USER_REPOS:
      return {
        ...state,
        repos: action.data.data.map(repo => {
          return {
            name: repo.name,
            description: repo.description
          };
        })
      };
    default:
      return state;
  }
}
