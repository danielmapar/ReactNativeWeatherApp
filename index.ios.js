/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  MapView
} from 'react-native';

import Api from './src/api';

class Weather extends Component {

  constructor() {
    super();
    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  }

  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

    Api(region.latitude, region.longitude).then((data) => {
      // when using fat arrow function this ==== the component this
      // when using the 'function' syntax, this can be anything
      this.setState({
        city: data.city,
        temperature: data.temperature,
        description: data.description
      });
      // this.setState(data);
    }).catch((err) => console.log("Request error: ", err));
  }

  render() {

    return (
      <View style={styles.container}>
        <MapView
          annotations={[this.state.pin]}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          style={styles.map}
        ></MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }

});

AppRegistry.registerComponent('weather', () => Weather);
