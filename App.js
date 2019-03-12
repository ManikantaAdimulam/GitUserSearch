/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./Source/Redux/ConfigureStore";
import DashBoard from "./Source/Components/DashBoard";

const Store = configureStore();
export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <DashBoard />
      </Provider>
    );
  }
}
