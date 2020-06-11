import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail'
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer'
import configureStore from './src/store/configureStore'

const store = configureStore()

Navigation.registerComponent(
  'maxReactNative.AuthScreen',
  () => AuthScreen,
  store,
  Provider
)

Navigation.registerComponent(
  'maxReactNative.SharePlaceScreen',
  () => SharePlaceScreen,
  store,
  Provider
)

Navigation.registerComponent(
  'maxReactNative.FindPlaceScreen',
  () => FindPlaceScreen,
  store,
  Provider
)

Navigation.registerComponent(
  'maxReactNative.PlaceDetailScreen',
  () => PlaceDetailScreen,
  store,
  Provider
)

Navigation.registerComponent(
  'maxReactNative.SideDrawerScreen',
  () => SideDrawerScreen,
  store,
  Provider
)

export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: 'maxReactNative.AuthScreen',
    title: 'Login'
  }
})
