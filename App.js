import React from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const Appsee = require("react-native-appsee");

const dataItems = [];
for (let i = 0; i < 100; i++) {
  dataItems.push(i.toString());
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bottomBarHeight: new Animated.Value(100),
    };
  }

  componentWillMount() {
    this.initPanResponder();
    Appsee.start("<Insert valid Appsee key here>");
    Appsee.setUserId("1");
  }

  initPanResponder = () => {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        this.state.bottomBarHeight.setValue(
          Dimensions.get("window").height - gestureState.moveY,
        );
      },
    });
  }

  render() {
    const screenWidth = Dimensions.get("window").width;

    return (
      <View style={styles.container}>
        <View style={[styles.listWrapper, { width: screenWidth }]}>
          <FlatList
            contentContainerStyle={[styles.listContentContainer]}
            data={dataItems}
            keyExtractor={(item, index) => { return item; }}
            renderItem={this.renderDataItem}
          />
        </View>
        {this.renderBottomBar()}
      </View>
    );
  }

  renderDataItem = (info, index) => {
    return (
      <View style={styles.dataItem}>
        <Text style={styles.dataItemText}>
          {info.item}
        </Text>
      </View>
    );
  }

  renderBottomBar = () => {
    const heightStyle = {
      height: this.state.bottomBarHeight,
    };

    return (
      <Animated.View
        style={[styles.bottomBar, heightStyle]}
        {...this.panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={this.showOnPressAlert}
          style={styles.button}
        >
          <Text>Press</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  showOnPressAlert = () => {
    Alert.alert("Press");
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  listWrapper: {
    flex: 1,
  },
  listContentContainer: {
    paddingVertical: 5,
  },
  dataItem: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "stretch",
    paddingVertical: 30,
    flexDirection: "row",
  },
  dataItemText: {
    flex: 1,
    textAlign: "center",
  },
  bottomBar: {
    alignSelf: "stretch",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
  },
  button: {
    height: 30,
    width: 200,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
