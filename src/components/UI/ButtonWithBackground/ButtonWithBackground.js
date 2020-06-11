import React from 'react'
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet
} from 'react-native'

const buttonWithBackground = props => {
  const content = (
    <View style={[
      styles.button,
      { backgroundColor: props.color },
      props.disabled ? styles.disabled : null
    ]}>
      <Text style={[
        styles.buttonText,
        props.disabled ? styles.disabledText : null
      ]}>{props.children}</Text>
    </View>
  )

  if (props.disabled) {
    return content
  }

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    )
  }
  return (
    <TouchableOpacity onPress={props.onPress}>
      {content}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16
  },
  disabled: {
    backgroundColor: '#EEE',
    color: '#AAA',
    borderColor: '#AAA'
  },
  disabledText: {
    color: '#AAA'
  }
})

export default buttonWithBackground
