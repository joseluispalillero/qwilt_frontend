import Services from "../../services/services";
const propertyService = new Services();

export const FETCH_PROPERTY_SENT = 'FETCH_PROPERTY_SENT'
export const FETCH_PROPERTY_SUCCESS = 'FETCH_PROPERTY_SUCCESS'
export const FETCH_PROPERTY_FAILURE = 'FETCH_PROPERTY_FAILURE'

export const FETCH_PROPERTY_ADD_SENT = 'FETCH_PROPERTY_ADD_SENT'
export const FETCH_PROPERTY_ADD_SUCCESS = 'FETCH_PROPERTY_ADD_SUCCESS'
export const FETCH_PROPERTY_ADD_FAILURE = 'FETCH_PROPERTY_ADD_FAILURE'

export const FETCH_PROPERTY_UPDATE_SENT = 'FETCH_PROPERTY_UPDATE_SENT'
export const FETCH_PROPERTY_UPDATE_SUCCESS = 'FETCH_PROPERTY_UPDATE_SUCCESS'
export const FETCH_PROPERTY_UPDATE_FAILURE = 'FETCH_PROPERTY_UPDATE_FAILURE'

export const FETCH_PROPERTY_REMOVE_SENT = 'FETCH_PROPERTY_REMOVE_SENT'
export const FETCH_PROPERTY_REMOVE_SUCCESS = 'FETCH_PROPERTY_REMOVE_SUCCESS'
export const FETCH_PROPERTY_REMOVE_FAILURE = 'FETCH_PROPERTY_REMOVE_FAILURE'

export const getProperties = () => async dispatch => {
  dispatch({type: FETCH_PROPERTY_SENT})
  try{
    const response = await propertyService.getProperties();
    console.log(response.data.Properties)
    dispatch({type: FETCH_PROPERTY_SUCCESS, payload: response.data.Properties})
  } catch(err) {
    dispatch({type: FETCH_PROPERTY_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const addProperty = (data) => async dispatch => {
  dispatch({type: FETCH_PROPERTY_ADD_SENT})
  try{
    const response = await propertyService.addProperty(data);
    dispatch({type: FETCH_PROPERTY_ADD_SUCCESS, payload: response.data.Property})
  } catch(err) {
    dispatch({type: FETCH_PROPERTY_ADD_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const updateProperty = (id, data) => async dispatch => {
  dispatch({type: FETCH_PROPERTY_UPDATE_SENT})
  try{
    const response = await propertyService.updateProperty(id, data);
    dispatch({type: FETCH_PROPERTY_UPDATE_SUCCESS, payload: {id: id, data: response.data.Property}})
  } catch(err) {
    dispatch({type: FETCH_PROPERTY_UPDATE_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const removeProperty = (id) => async dispatch => {
  dispatch({type: FETCH_PROPERTY_REMOVE_SENT})
  try {
    await propertyService.deleteProperty(id)
    dispatch({type: FETCH_PROPERTY_REMOVE_SUCCESS, payload: {id: id}})
  } catch (err){
    dispatch({type: FETCH_PROPERTY_REMOVE_FAILURE, payload: err})
    console.log(err)
  }
}
