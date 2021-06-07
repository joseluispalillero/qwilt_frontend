import Services from "../../services/services";
const propertyService = new Services();

export const FETCH_LEASE_SENT = 'FETCH_LEASE_SENT'
export const FETCH_LEASE_SUCCESS = 'FETCH_LEASE_SUCCESS'
export const FETCH_LEASE_FAILURE = 'FETCH_LEASE_FAILURE'

export const FETCH_LEASE_ADD_SENT = 'FETCH_LEASE_ADD_SENT'
export const FETCH_LEASE_ADD_SUCCESS = 'FETCH_LEASE_ADD_SUCCESS'
export const FETCH_LEASE_ADD_FAILURE = 'FETCH_LEASE_ADD_FAILURE'

export const FETCH_LEASE_UPDATE_SENT = 'FETCH_LEASE_UPDATE_SENT'
export const FETCH_LEASE_UPDATE_SUCCESS = 'FETCH_LEASE_UPDATE_SUCCESS'
export const FETCH_LEASE_UPDATE_FAILURE = 'FETCH_LEASE_UPDATE_FAILURE'

export const FETCH_LEASE_REMOVE_SENT = 'FETCH_LEASE_REMOVE_SENT'
export const FETCH_LEASE_REMOVE_SUCCESS = 'FETCH_LEASE_REMOVE_SUCCESS'
export const FETCH_LEASE_REMOVE_FAILURE = 'FETCH_LEASE_REMOVE_FAILURE'

export const getLeases = () => async dispatch => {
  dispatch({type: FETCH_LEASE_SENT})
  try{
    const response = await propertyService.getLeases();
    console.log(response.data.Leases)
    dispatch({type: FETCH_LEASE_SUCCESS, payload: response.data.Leases})
  } catch(err) {
    dispatch({type: FETCH_LEASE_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const addLease = (data) => async dispatch => {
  dispatch({type: FETCH_LEASE_ADD_SENT})
  try{
    const response = await propertyService.addLease(data);
    dispatch({type: FETCH_LEASE_ADD_SUCCESS, payload: response.data.Lease})
  } catch(err) {
    dispatch({type: FETCH_LEASE_ADD_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const updateLease = (id, data) => async dispatch => {
  dispatch({type: FETCH_LEASE_UPDATE_SENT})
  try{
    const response = await propertyService.updateLease(id, data);
    dispatch({type: FETCH_LEASE_UPDATE_SUCCESS, payload: {id: id, data: response.data.Lease}})
  } catch(err) {
    dispatch({type: FETCH_LEASE_UPDATE_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const removeLease = (id) => async dispatch => {
  dispatch({type: FETCH_LEASE_REMOVE_SENT})
  try {
    await propertyService.deleteLease(id)
    dispatch({type: FETCH_LEASE_REMOVE_SUCCESS, payload: {id: id}})
  } catch (err){
    dispatch({type: FETCH_LEASE_REMOVE_FAILURE, payload: err})
    console.log(err)
  }
}
