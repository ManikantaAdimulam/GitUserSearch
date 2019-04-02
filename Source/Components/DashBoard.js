import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import { NetworkManager } from "../Network/NetworkManager";
import { API, httpMethods } from "../Constants/Constants";
import { getUserData, getUserRepos } from "../Redux/ActionCreators";

/**
 * @class DashBoard
 * @extends {Component}
 */
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
    this.onChangeUserText = this.onChangeUserText.bind(this);
    this.requestUser = this.requestUser.bind(this);
  }

  /**
   * Life cycle method.
   *
   * @memberof DashBoard
   */
  componentDidMount() {
    this.requestUser();
  }

  /**
   * @param {*} { name, description }
   * @returns
   * @memberof DashBoard
   */
  renderItem = ({ item: { name, description } }) => (
    <View style={styles.cell}>
      <Text style={styles.header}>{name}</Text>
      <Text>{description}</Text>
    </View>
  );

  /**
   *
   * @param {*} {text}
   * @memberof DashBoard
   */
  onChangeUserText = text => {
    this.setState({ user: text });
  };

  /**
   * Data request.
   *
   * @memberof DashBoard
   */
  requestUser = () => {
    const { dispatch } = this.props;
    NetworkManager.request(API.getUser(this.state.user), httpMethods.get)
      .then(response => {
        dispatch(getUserData(response));
        this.requestUserRepos();
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   *
   *
   * @memberof DashBoard
   */
  requestUserRepos = () => {
    const { dispatch } = this.props;
    NetworkManager.request(API.getUserRepos(this.state.user), httpMethods.get)
      .then(response => {
        console.log(response);
        dispatch(getUserRepos(response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * @returns JSX
   * @memberof DashBoard
   */
  render() {
    const { avatarUrl, name, repos, isSuccess } = this.props;
    if (avatarUrl == undefined && name == undefined && !isSuccess) {
      return <View style={styles.container} >
      <ActivityIndicator style={{height: 50, width: 50}}/>
      </View>;
    } else {
      return (
        <SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
          <View style={styles.container}>
            <View style={styles.avatarView}>
              <View>
                <Text>Github User</Text>
              </View>
              <TextInput
                onChangeText={this.onChangeUserText}
                returnKeyType={"search"}
                onSubmitEditing={this.requestUser}
                placeholder={"Enter user name here...."}
                style={styles.textInput}
              />
              {avatarUrl !== undefined && (
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              )}
              <Text>{name}</Text>
            </View>
            {repos.length > 0 && (
              <View style={styles.reposView}>
                <View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>Repositories</Text>
                  </View>
                  <FlatList
                    data={repos}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => {
                      index.toString();
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({
  ...state.reducer
});

export default connect(mapStateToProps)(DashBoard);

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarView: {
    height: height * 0.25,
    width,
    alignItems: "center"
  },
  reposView: {
    height: height * 0.65,
    width
  },
  avatar: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    borderRadius: 50,
    marginBottom: 8
  },
  header: {
    fontSize: 14,
    fontWeight: "bold"
  },
  cell: {
    width,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    padding: 8
  },
  section: {
    height: 30,
    width,
    backgroundColor: "lightgray",
    justifyContent: "center",
    paddingLeft: 8,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "gray"
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  textInput: {
    height: 35,
    width,
    borderWidth: 5,
    borderColor: "gray",
    marginTop: 4,
    marginBottom: 8
  }
});
