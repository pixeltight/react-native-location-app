import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'

import BaseText from '../../components/UI/BaseText/BaseText'
import HeaderText from '../../components/UI/HeaderText/HeaderText'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import backgroundImage from '../../assets/background.jpg'
import validate from '../../components/utility/validation'
import { authInit, authAutoSignIn } from '../../store/actions/index'

class AuthScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
      authMode: 'login',
      formInputs: {
        email: {
          value: '',
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: '',
          valid: false,
          validationRules: {
            minLength: 6
          },
          touched: false
        },
        confirmPassword: {
          value: '',
          valid: false,
          validationRules: {
            equalTo: 'password'
          },
          touched: false
        }
      }
    }
    Dimensions.addEventListener('change', this.updateStyles)
  }

  componentDidMount () {
    this.props.onAuthAutoSignIn()
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    })
  }

  authInitHandler = () => {
    const authData = {
      email: this.state.formInputs.email.value,
      password: this.state.formInputs.password.value
    }
    this.props.onAuthInit(authData, this.state.authMode)
  }

  updateInputState = (key, value) => {
    let connectedValue = {}
    if (this.state.formInputs[key].validationRules.equalTo) {
      const equalControl = this.state.formInputs[key].validationRules.equalTo
      const equalValue = this.state.formInputs[equalControl].value
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }
    this.setState(prevState => {
      return {
        formInputs: {
          ...prevState.formInputs,
          confirmPassword: {
            ...prevState.formInputs.confirmPassword,
            valid: key === 'password'
              ? validate(
                prevState.formInputs.confirmPassword.value,
                prevState.formInputs.confirmPassword.validationRules,
                connectedValue
              )
              : prevState.formInputs.confirmPassword.valid
          },
          [key]: {
            ...prevState.formInputs[key],
            value: value,
            valid: validate(
              value,
              prevState.formInputs[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      }
    })
  }

  render () {
    let headerText = null
    let confirmPasswordControl = null
    
    let submitButton = <ButtonWithBackground
      onPress={this.authInitHandler}
      color="#29AAF4"
      disabled={
        (!this.state.formInputs.confirmPassword.valid && this.state.authMode) === 'signup' ||
        !this.state.formInputs.email.valid ||
        !this.state.formInputs.password.valid
      }>Submit</ButtonWithBackground>

    if (this.state.viewMode === 'portrait') {
      headerText = (
        <BaseText>
          <HeaderText>
            {this.state.authMode === 'login' ? 'Please Log In' : 'Sign Up'}
          </HeaderText>
        </BaseText>
      )
    }
    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <View style={this.state.viewMode === 'portrait'
          ? styles.portraitPasswordContainer
          : styles.landscapePasswordWrapper}>
          <DefaultInput
            placeholder='Confirm Password' style={styles.input}
            value={this.state.formInputs.confirmPassword.value}
            onChangeText={(value) => this.updateInputState('confirmPassword', value)}
            valid={this.state.formInputs.confirmPassword.valid}
            touched={this.state.formInputs.confirmPassword.touched}
            secureTextEntry />
        </View>
      )
    }

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />
    }
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          {headerText}
          <ButtonWithBackground
            color='#29AAF4'
            onPress={this.switchAuthModeHandler}>
            Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Log in'}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder='Your email address'
                style={styles.input}
                value={this.state.formInputs.email.value}
                onChangeText={(value) => this.updateInputState('email', value)}
                valid={this.state.formInputs.email.valid}
                touched={this.state.formInputs.email.touched}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address' />
              <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                ? styles.portraitPasswordContainer
                : styles.landscapePasswordContainer}>
                <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordWrapper}>
                  <DefaultInput
                    placeholder='Password'
                    style={styles.input}
                    value={this.state.formInputs.password.value}
                    onChangeText={(value) => this.updateInputState('password', value)}
                    valid={this.state.formInputs.password.valid}
                    touched={this.state.formInputs.password.touched}
                    secureTextEntry />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {submitButton}
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '100%'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  portraitPasswordWrapper: {
    width: '100%'
  },
  landscapePasswordWrapper: {
    width: '45%'
  }
})

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthInit: (authData, authMode) => dispatch(authInit(authData, authMode)),
    onAuthAutoSignIn: () => dispatch(authAutoSignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)

