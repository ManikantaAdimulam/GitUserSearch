export const httpMethods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE"
};
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const API = {
  getUser: user => {
    return `https://api.github.com/users/${user}`;
  },
  getUserRepos: user => {
    return `https://api.github.com/users/${user}/repos`;
  }
};
