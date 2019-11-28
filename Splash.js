import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export default class Splash extends Component{
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.txt}>Siemano</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000066',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 20,
  },
})
