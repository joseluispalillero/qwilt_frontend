import Services from "../../services/services";
const portfolioService = new Services();

export const FETCH_PORTFOLIO_SENT = 'FETCH_PORTFOLIO_SENT'
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS'
export const FETCH_PORTFOLIO_FAILURE = 'FETCH_PORTFOLIO_FAILURE'

export const FETCH_PORTFOLIO_ADD_SENT = 'FETCH_PORTFOLIO_ADD_SENT'
export const FETCH_PORTFOLIO_ADD_SUCCESS = 'FETCH_PORTFOLIO_ADD_SUCCESS'
export const FETCH_PORTFOLIO_ADD_FAILURE = 'FETCH_PORTFOLIO_ADD_FAILURE'

export const FETCH_PORTFOLIO_UPDATE_SENT = 'FETCH_PORTFOLIO_UPDATE_SENT'
export const FETCH_PORTFOLIO_UPDATE_SUCCESS = 'FETCH_PORTFOLIO_UPDATE_SUCCESS'
export const FETCH_PORTFOLIO_UPDATE_FAILURE = 'FETCH_PORTFOLIO_UPDATE_FAILURE'

export const FETCH_PORTFOLIO_REMOVE_SENT = 'FETCH_PORTFOLIO_REMOVE_SENT'
export const FETCH_PORTFOLIO_REMOVE_SUCCESS = 'FETCH_PORTFOLIO_REMOVE_SUCCESS'
export const FETCH_PORTFOLIO_REMOVE_FAILURE = 'FETCH_PORTFOLIO_REMOVE_FAILURE'

export const getPortfolios = () => async dispatch => {
  dispatch({type: FETCH_PORTFOLIO_SENT})
  try{
    const response = await portfolioService.getPortfolios();
    dispatch({type: FETCH_PORTFOLIO_SUCCESS, payload: response.data.Portfolios})
  } catch(err) {
    dispatch({type: FETCH_PORTFOLIO_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const addPortfolio = (data) => async dispatch => {
  dispatch({type: FETCH_PORTFOLIO_ADD_SENT})
  try{
    const response = await portfolioService.addPortfolio(data);
    dispatch({type: FETCH_PORTFOLIO_ADD_SUCCESS, payload: response.data.Portfolio})
  } catch(err) {
    dispatch({type: FETCH_PORTFOLIO_ADD_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const updatePortfolio = (id, data) => async dispatch => {
  dispatch({type: FETCH_PORTFOLIO_UPDATE_SENT})
  try{
    const response = await portfolioService.updatePortfolio(id, data);
    dispatch({type: FETCH_PORTFOLIO_UPDATE_SUCCESS, payload: {id: id, data: response.data.Portfolio}})
  } catch(err) {
    dispatch({type: FETCH_PORTFOLIO_UPDATE_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const removePortfolio = (id) => async dispatch => {
  dispatch({type: FETCH_PORTFOLIO_REMOVE_SENT})
  try {
    await portfolioService.deletePortfolio(id)
    dispatch({type: FETCH_PORTFOLIO_REMOVE_SUCCESS, payload: {id: id}})
  } catch (err){
    dispatch({type: FETCH_PORTFOLIO_REMOVE_FAILURE, payload: err})
    console.log(err)
  }
}
