import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const defaultInput = (props) => (
  <TextInput underlineColorAndroid='transparent'
    {...props}
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched ? styles.invalid : null
    ]} />
)

const styles = StyleSheet.create({
  input: {
    width: '85%',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fffbe8',
    borderColor: '#BCBCBC',
    paddingTop: 10,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5
  },
  invalid: {
    backgroundColor: '#F9C0C0',
    borderColor: '#B00'
  }
})

export default defaultInput
