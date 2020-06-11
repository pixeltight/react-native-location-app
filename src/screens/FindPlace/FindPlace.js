import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native'

import { connect } from 'react-redux'

import PlaceList from '../../components/PlaceList/PlaceList'
import { getPlaces } from '../../store/actions/index'

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  constructor (props) {
    super(props)
    this.state = {
      placesLoaded: false,
      removeAnimation: new Animated.Value(1),
      addAnimation: new Animated.Value(0)
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = event => {
    if (event.type === 'ScreenChangedEvent') {
      if (event.id === 'willAppear') {
        this.props.onLoadPlaces()
        // this.setState({
        //   placesLoaded: false
        // })
      }
    }
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        })
      }
    }
  }

  itemSelectedHandler = id => {
    const selPlace = this.props.places.find(place => {
      return place.id === id
    })

    this.props.navigator.push({
      screen: 'maxReactNative.PlaceDetailScreen',
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace
      }
    })
  }

  placesLoadeHandler = () => {
    Animated.timing(this.state.addAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      })
      this.placesLoadeHandler()
    })
  }

  render () {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnimation,
          transform: [
            {
              scale: this.state.removeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 1]
              })
            }
          ]
        }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )

    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.addAnimation
          }}>
          <PlaceList
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler} />
        </Animated.View>
      )
    }

    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontSize: 26,
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen)
