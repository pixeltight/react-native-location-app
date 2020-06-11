import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionTypes'
import { uiStartLoading, uiStopLoading, authGetToken } from './index'

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  }
}

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken
    dispatch(uiStartLoading())
    dispatch(authGetToken())
      .catch(err => {
        console.log('Token not found: ', err)
        alert('Token not found!')
      })
      .then(token => {
        authToken = token
        return fetch('https://us-central1-maxreactnative-1551491897938.cloudfunctions.net/storeImage', {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
      })
      .catch(err => {
        console.log(err)
        alert('Error adding location')
        dispatch(uiStopLoading())
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath
        }
        return fetch('https://maxreactnative-1551491897938.firebaseio.com/places.json?auth=' + authToken, {
          method: 'POST',
          body: JSON.stringify(placeData)
        })
        // .then(() => {
        //   dispatch(getPlaces())
        // })
        // .catch(err => {
        //   alert('Error retrieving place list')
        // })
          .then(res => {
            if (res.ok) {
              return res.json
            } else {
              throw new Error()
            }
          })
          .then(parsedRes => {
            dispatch(uiStopLoading())
            dispatch(placeAdded())
          })
          .catch(err => {
            console.log(err)
            alert('Error adding location')
            dispatch(uiStopLoading())
          })
      })
  }
}

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  }
}

export const getPlaces = () => {
  return (dispatch) => {
    dispatch(authGetToken())
      .then(token => {
        return fetch('https://maxreactnative-1551491897938.firebaseio.com/places.json?auth=' + token)
      })
      .catch(err => {
        console.log('Token not found: ', err)
        alert('Token not found!')
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(parsedRes => {
        const places = []
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            id: key
          })
        }
        dispatch(setPlaces(places))
      })
      .catch(err => {
        alert('Error retrieving location list')
        console.log('Error retrieving location list: ', err)
      })
  }
}

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  }
}

export const deletePlace = id => {
  return (dispatch) => {
    dispatch(authGetToken())
      .catch(err => {
        console.log('Token not found: ', err)
        alert('Token not found!')
      })
      .then(token => {
        dispatch(removePlace(id))
        return fetch('https://maxreactnative-1551491897938.firebaseio.com/places/' + id + '.json?auth=' + token,
          {
            method: 'DELETE'
          })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(parsedRes => {
        console.log('Deleted: ', id)
      })
      .catch(err => {
        alert('Error deleting location')
        console.log('Error deleting locaiton: ', err)
      })
  }
}

export const removePlace = id => {
  return {
    type: REMOVE_PLACE,
    id: id
  }
}
