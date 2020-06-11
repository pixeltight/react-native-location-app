import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'

import { addPlace } from '../../store/actions/index'
import BaseText from '../../components/UI/BaseText/BaseText'
import HeaderText from '../../components/UI/HeaderText/HeaderText'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'
import validate from '../../components/utility/validation'
import { startAddPlace } from '../../store/actions/index'

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  constructor (props) {
    super (props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = event => {
    if (event.type === 'ScreenChangedEvent') {
      if (event.id === 'willAppear') {
        this.props.onStartAddPlace()
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

  updateInputState = (id, val) => {
    this.setState(prevState => {
      return {
        formInputs: {
          ...prevState.formInputs,
          [id]: {
            ...prevState.formInputs[id],
            value: val,
            valid: validate(
              val,
              prevState.formInputs[id].validationRules
            ),
            touched: true
          }
        }
      }
    })
  }

  placeAddedHandler = () => {
    Keyboard.dismiss()
    this.props.onAddPlace(
      this.state.formInputs.placeName.value,
      this.state.formInputs.location.value,
      this.state.formInputs.image.value
    )
    this.reset()
    this.imagePicker.reset()
    this.locationPicker.reset()
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        formInputs: {
          ...prevState.formInputs,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }

  loctationPickedHandler = (location) => {
    this.setState(prevState => {
      return {
        formInputs: {
          ...prevState.formInputs,
          location: {
            value: location,
            valid: true
          }
        }
      }
    })
  }

  reset = () => {
    this.setState({
      formInputs: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          location: null,
          valid: false
        }
      }
    })
  }

  componentWillMount () {
    this.reset()
  }

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({tabIndex: 0})
      // this.props.onStartAddPlace()
    }
  }

  render () {
    let submitButton = <Button
      title='Share the Place'
      onPress={this.placeAddedHandler}
      disabled={
        !this.state.formInputs.placeName.valid ||
        !this.state.formInputs.location.valid ||
        !this.state.formInputs.image.valid} />

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }

    return (
      <ScrollView>
        {/* Use 'exta' <View> for Android Ios consistency */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <BaseText>
              <HeaderText>Share your place!</HeaderText>
            </BaseText>
            <PickImage onImagePick={this.imagePickedHandler} ref={ref => this.imagePicker = ref} />
            <PickLocation onLocationPick={this.loctationPickedHandler} ref={ref => this.locationPicker = ref} />
            <PlaceInput
              placeData={this.state.formInputs.placeName}
              onChangeText={(value) => this.updateInputState('placeName', value)} />
            <View style={styles.button}>
              {submitButton}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    margin: 8
  }
})

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
    onStartAddPlace: () => dispatch(startAddPlace())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)
