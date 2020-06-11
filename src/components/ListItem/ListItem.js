import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const listItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onItemPressed}>
      <View style={styles.listItem}>
        <Image
          source={props.placeImage}
          resizeMode='contain'
          style={styles.placeImage} />
        <Text>{props.placeName}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    backgroundColor: '#EEE',
    marginBottom: 5
  },
  placeImage: {
    marginRight: 8,
    height: 50,
    width: 50
  }
})

export default listItem
