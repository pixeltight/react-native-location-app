import React from 'react'
import { Text, StyleSheet } from 'react-native'

const headerText = (props) => (
  <Text {...props} style={styles.headerText}>
    {props.children}
  </Text>
)

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28
  }
})

export default headerText
