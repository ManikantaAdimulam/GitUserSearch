import { Actions } from "./ActionCreators";

const initialState = {
  name: "",
  avatarUrl: "",
  repos: [],
  isSuccess: true
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USER:
      return {
        ...state,
        name: action.data.name,
        avatarUrl: action.data.avatar_url,
        message: action.data.message !== undefined ? false : true
      };
    case Actions.GET_USER_REPOS:
      return {
        ...state,
        repos: action.data.map(repo => {
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
