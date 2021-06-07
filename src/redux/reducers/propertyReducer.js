import {
  FETCH_PROPERTY_SENT,
  FETCH_PROPERTY_SUCCESS,
  FETCH_PROPERTY_FAILURE,
  FETCH_PROPERTY_REMOVE_SENT,
  FETCH_PROPERTY_REMOVE_SUCCESS,
  FETCH_PROPERTY_REMOVE_FAILURE,
  FETCH_PROPERTY_ADD_FAILURE,
  FETCH_PROPERTY_ADD_SUCCESS,
  FETCH_PROPERTY_UPDATE_SUCCESS,
  FETCH_PROPERTY_UPDATE_FAILURE
} from '../actions/propertyAction'
import {LOG_IN_SENT, LOG_LOGOUT_USER} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
  property: []
}

export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTY_REMOVE_SENT:
    case FETCH_PROPERTY_SENT:
      return state;
    case LOG_IN_SENT:
    case LOG_LOGOUT_USER:
      state = initialState
      return state
    case FETCH_PROPERTY_SUCCESS:
      return merger(state, {properties: action.payload, propertiesErr: undefined})
    case FETCH_PROPERTY_FAILURE:
      return merger(state, {propertiesEr: action.payload})

    case FETCH_PROPERTY_ADD_SUCCESS:
      return {...state, properties: adder(state.properties, action.payload)}
    case FETCH_PROPERTY_ADD_FAILURE:
      return merger(state, {propertiesEr: action.payload})

    case FETCH_PROPERTY_UPDATE_SUCCESS:
      let index = state.properties.findIndex(u => u._id === action.payload.id)
      return {...state, properties: updater(state.properties, action.payload.data, index)}
    case FETCH_PROPERTY_UPDATE_FAILURE:
      return merger(state, {propertiesEr: action.payload})

    case FETCH_PROPERTY_REMOVE_SUCCESS:
      return {...state, properties: remover(state.properties, action.payload.id)}
    case FETCH_PROPERTY_REMOVE_FAILURE:
      return merger(state, {propertiesEr: action.payload})

    default:
      return state
  }
}
