import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'
import { authLogout } from '../../store/actions/index'

class SideDrawer extends Component {
  render () {
    return (
      <View style={[
        styles.container,
        { width: Dimensions.get('window').width * 0.8 }
      ]}>
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
              size={30}
              color='#448ded'
              style={styles.drawerItemIcon} />
            <Text>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#FFF',
    flex: 1
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#EEE'
  },
  drawerItemIcon: {
    marginRight: 10
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  }
}

export default connect(null, mapDispatchToProps)(SideDrawer)
