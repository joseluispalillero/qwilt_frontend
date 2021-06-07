import {
  FETCH_LEASE_SENT,
  FETCH_LEASE_SUCCESS,
  FETCH_LEASE_FAILURE,
  FETCH_LEASE_REMOVE_SENT,
  FETCH_LEASE_REMOVE_SUCCESS,
  FETCH_LEASE_REMOVE_FAILURE,
  FETCH_LEASE_ADD_FAILURE,
  FETCH_LEASE_ADD_SUCCESS,
  FETCH_LEASE_UPDATE_SUCCESS,
  FETCH_LEASE_UPDATE_FAILURE
} from '../actions/leaseAction'
import {LOG_LOGOUT_USER, LOG_IN_SENT} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
  lease: []
}

export const leaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEASE_REMOVE_SENT:
    case FETCH_LEASE_SENT:
      return state;
    case LOG_IN_SENT:
    case LOG_LOGOUT_USER:
      state = initialState
      return state
    case FETCH_LEASE_SUCCESS:
      return merger(state, {leases: action.payload, leasesErr: undefined})
    case FETCH_LEASE_FAILURE:
      return merger(state, {leasesEr: action.payload})

    case FETCH_LEASE_ADD_SUCCESS:
      return {...state, leases: adder(state.leases, action.payload)}
    case FETCH_LEASE_ADD_FAILURE:
      return merger(state, {leasesEr: action.payload})

    case FETCH_LEASE_UPDATE_SUCCESS:
      let index = state.leases.findIndex(u => u._id === action.payload.id)
      return {...state, leases: updater(state.leases, action.payload.data, index)}
    case FETCH_LEASE_UPDATE_FAILURE:
      return merger(state, {leasesEr: action.payload})

    case FETCH_LEASE_REMOVE_SUCCESS:
      return {...state, leases: remover(state.leases, action.payload.id)}
    case FETCH_LEASE_REMOVE_FAILURE:
      return merger(state, {leasesEr: action.payload})

    default:
      return state
  }
}
