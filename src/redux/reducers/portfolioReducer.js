import {
  FETCH_PORTFOLIO_SENT,
  FETCH_PORTFOLIO_SUCCESS,
  FETCH_PORTFOLIO_FAILURE,
  FETCH_PORTFOLIO_REMOVE_SENT,
  FETCH_PORTFOLIO_REMOVE_SUCCESS,
  FETCH_PORTFOLIO_REMOVE_FAILURE,
  FETCH_PORTFOLIO_ADD_FAILURE,
  FETCH_PORTFOLIO_ADD_SUCCESS,
  FETCH_PORTFOLIO_UPDATE_SUCCESS,
  FETCH_PORTFOLIO_UPDATE_FAILURE
} from '../actions/portfolioAction'
import {LOG_IN_SENT, LOG_LOGOUT_USER} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
  portfolio: []
}

export const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PORTFOLIO_REMOVE_SENT:
    case FETCH_PORTFOLIO_SENT:
      return state;
    case LOG_LOGOUT_USER:
    case LOG_IN_SENT:
      state = initialState
      return state
    case FETCH_PORTFOLIO_SUCCESS:
      return merger(state, {portfolios: action.payload, portfoliosErr: undefined})
    case FETCH_PORTFOLIO_FAILURE:
      return merger(state, {portfoliosEr: action.payload})

    case FETCH_PORTFOLIO_ADD_SUCCESS:
      return {...state, portfolios: adder(state.portfolios, action.payload)}
    case FETCH_PORTFOLIO_ADD_FAILURE:
      return merger(state, {portfoliosEr: action.payload})

    case FETCH_PORTFOLIO_UPDATE_SUCCESS:
      let index = state.portfolios.findIndex(u => u._id === action.payload.id)
      return {...state, portfolios: updater(state.portfolios, action.payload.data, index)}
    case FETCH_PORTFOLIO_UPDATE_FAILURE:
      return merger(state, {portfoliosEr: action.payload})

    case FETCH_PORTFOLIO_REMOVE_SUCCESS:
      return {...state, portfolios: remover(state.portfolios, action.payload.id)}
    case FETCH_PORTFOLIO_REMOVE_FAILURE:
      return merger(state, {portfoliosEr: action.payload})

    default:
      return state
  }
}
