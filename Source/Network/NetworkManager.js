import React, { Component } from "react";
import { create } from "apisauce";
import { httpMethods, headers } from "../Constants/Constants";

const baseApi = create({
  baseURL: "http://192.168.1.206:4004/",
  timeout: 30000
});

export const NetworkManager = {
  request: (url, httpMethod, parameters) => {
    switch (httpMethod) {
      case httpMethods.get:
        return baseApi
          .get(url)
          .then(response => {
            return response;
          })
          .catch(error => {
            console.log(error);
          });
      case httpMethods.post:
        return baseApi
          .post(url, parameters, headers)
          .then(response => {
            return response;
          })
          .catch(error => {
            console.log(error);
          });
      case httpMethods.put:
        return baseApi
          .put(url, parameters, headers)
          .then(response => {
            return response;
          })
          .catch(error => {
            console.log(error);
          });
      case httpMethods.delete:
        return baseApi
          .delete(url, parameters, headers)
          .then(response => {
            return response;
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
