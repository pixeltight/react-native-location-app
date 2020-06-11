import React from 'react'
import { Text, StyleSheet } from 'react-native'

const baseText = (props) => (
  <Text {...props}
    style={[
      style.baseText,
      props.style
    ]}
  >
    {props.children}
  </Text>
)

const style = StyleSheet.create({
  baseText: {
    color: '#666',
    backgroundColor: 'transparent'
  }
})

export default baseText
