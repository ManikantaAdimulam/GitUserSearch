import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { NetworkManager } from "../Network/NetworkManager";
import { API, httpMethods } from "../Constants/Constants";
import { getUserData } from "../Redux/ActionCreators";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "ManikantaAdimulam"
    };
    this.onChangeUserText = this.onChangeUserText.bind(this);
  }

  componentDidMount() {
      this.requestUser()
  }
  renderItem = ({ name, description }) => {
    return (
      <View>
        <Text>{name}</Text>
        <Text>{description}</Text>
      </View>
    );
  };

  onChangeUserText = text => {
    this.setState({ user: text });
  };

  requestUser = () => {
    const {dispatch} = this.props
    dispatch(NetworkManager.request(API.getUser(this.state.user), httpMethods.get)).then(response =>{
        dispatch(getUserData(response))
        NetworkManager.request(API.getUserRepos)
    }).catch(error => {
        console.log(error)
    })
  }

  requestUserRepos = () => {
    const {dispatch} = this.props
    dispatch(NetworkManager.request(API.getUserRepos(this.state.user), httpMethods.get)).then(response =>{
        dispatch(getUserData(response))
    }).catch(error => {
        console.log(error)
    })
  }
  render() {

    const { avatarUrl, name, repos, isSuccess } = this.props;
    if (avatarUrl == "" && description == "" && !isSuccess) {
        <View style={styles.container}><Text>User not found</Text></View>
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.avatarView}>
            <View>
              <Text>Github User</Text>
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onChangeUserText}
            />
            {avatarUrl !== "" && <Image source={{ uri: avatarUrl }} />}
            <Text>{name}</Text>
          </View>
          <View style={styles.listView}>
            <FlatList
              data={repos}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => {
                index.toString();
              }}
            />
          </View>
        </View>
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
    flex: 1,
    backgroundColor: "#000"
  },
  avatarView: {
    height: height * 0.25,
    width,
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    height: height * 0.15,
    width: width * 0.5,
    resizeMode: "contain"
  },
  listView: {
    height: height * 0.75,
    width
  },
  list: {
    flex: 1
  },
  header: {},
  textInput: {
    height: 44,
    width
  }
});
