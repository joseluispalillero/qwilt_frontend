import {
  FETCH_CONTACT_SENT,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_FAILURE,
  FETCH_CONTACT_REMOVE_SENT,
  FETCH_CONTACT_REMOVE_SUCCESS,
  FETCH_CONTACT_REMOVE_FAILURE,
  FETCH_CONTACT_ADD_FAILURE,
  FETCH_CONTACT_ADD_SUCCESS,
  FETCH_CONTACT_UPDATE_SUCCESS,
  FETCH_CONTACT_UPDATE_FAILURE
} from '../actions/contactAction'
import {LOG_LOGOUT_USER, LOG_IN_SENT} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
  contact: []
}

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACT_REMOVE_SENT:
    case FETCH_CONTACT_SENT:
      return state;
    case LOG_IN_SENT:
    case LOG_LOGOUT_USER:
      state = initialState
      return state
    case FETCH_CONTACT_SUCCESS:
      return merger(state, {contacts: action.payload, contactsErr: undefined})
    case FETCH_CONTACT_FAILURE:
      return merger(state, {contactsEr: action.payload})

    case FETCH_CONTACT_ADD_SUCCESS:
      return {...state, contacts: adder(state.contacts, action.payload)}
    case FETCH_CONTACT_ADD_FAILURE:
      return merger(state, {contactsEr: action.payload})

    case FETCH_CONTACT_UPDATE_SUCCESS:
      let index = state.contacts.findIndex(u => u._id === action.payload.id)
      return {...state, contacts: updater(state.contacts, action.payload.data, index)}
    case FETCH_CONTACT_UPDATE_FAILURE:
      return merger(state, {contactsEr: action.payload})

    case FETCH_CONTACT_REMOVE_SUCCESS:
      return {...state, contacts: remover(state.contacts, action.payload.id)}
    case FETCH_CONTACT_REMOVE_FAILURE:
      return merger(state, {contactsEr: action.payload})

    default:
      return state
  }
}
