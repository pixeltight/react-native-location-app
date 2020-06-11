import React, { Component } from 'react'
import {
  View,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native'

import MapView from 'react-native-maps'

class PickLocation extends Component {
  
  componentWillMount () {
    this.reset()
  }
  
  reset = () => {
    this.setState({
      focusedLocation: {
        latitude: 29.9511,
        longitude: -90.0715,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get('window').width /
          Dimensions.get('window').height * 0.0122
      },
      isLocationChosen: false
    })
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    })
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        isLocationChosen: true
      }
    })
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      this.pickLocationHandler(coordsEvent)
    }, err => {
      console.log(err)
      alert('Fetching the position failed. Please select one manually.')
    })
  }

  render () {
    let marker = null

    if (this.state.isLocationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          // no longer needed after animation added
          // putting back for reset ??
          region={!this.state.locationChosen ? this.state.focusedLocation : null}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => { this.map = ref }}>
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title='Locate me' onPress={this.getLocationHandler} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    marginTop: 8,
    marginBottom: 19
  }
})

export default PickLocation
