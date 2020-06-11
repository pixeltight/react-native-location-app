import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from '../actions/actionTypes'

const initialState = {
  places: [],
  placeAdded: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_PLACE:
    //   return {
    //     ...state,
    //     places: state.places.concat({
    //       key: Math.random(),
    //       name: action.placeName,
    //       image: {
    //         uri: action.image.uri
    //       },
    //       location: action.location
    //     })
    //   }
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      }
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.id !== action.id
        })
      }
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      }
    case START_ADD_PLACE: {
      return {
       ...state,
       placeAdded: false 
      }
    }
    default:
      return state
  }
}

export default reducer
