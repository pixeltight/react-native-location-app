import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions/index'
import MapView from 'react-native-maps'

class PlaceDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
    }

    Dimensions.addEventListener('change', this.updateStyles)
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    })
  }

  placeDeleteHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.id)
    this.props.navigator.pop()
  }

  render () {
    return (
      <View style={[
        styles.container,
        this.state.viewMode === 'portrait'
          ? styles.portraitContainer
          : styles.landscapeContainer
      ]}>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage} />
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width /
                  Dimensions.get('window').height * 0.0122
              }}
              style={styles.map}>
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeleteHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                  color='#666' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: '100%',
    height: '100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  placeName: {
    textAlign: 'center',
    fontSize: 25,
    color: '#CCC'
  },
  deleteButton: {
    alignItems: 'center'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: id => dispatch(deletePlace(id))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail)
