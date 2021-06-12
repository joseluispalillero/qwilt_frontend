import Services from "../../services/services";
const contactService = new Services();

export const FETCH_CONTACT_SENT = 'FETCH_CONTACT_SENT'
export const FETCH_CONTACT_SUCCESS = 'FETCH_CONTACT_SUCCESS'
export const FETCH_CONTACT_FAILURE = 'FETCH_CONTACT_FAILURE'

export const FETCH_CONTACT_ADD_SENT = 'FETCH_CONTACT_ADD_SENT'
export const FETCH_CONTACT_ADD_SUCCESS = 'FETCH_CONTACT_ADD_SUCCESS'
export const FETCH_CONTACT_ADD_FAILURE = 'FETCH_CONTACT_ADD_FAILURE'

export const FETCH_CONTACT_UPDATE_SENT = 'FETCH_CONTACT_UPDATE_SENT'
export const FETCH_CONTACT_UPDATE_SUCCESS = 'FETCH_CONTACT_UPDATE_SUCCESS'
export const FETCH_CONTACT_UPDATE_FAILURE = 'FETCH_CONTACT_UPDATE_FAILURE'

export const FETCH_CONTACT_REMOVE_SENT = 'FETCH_CONTACT_REMOVE_SENT'
export const FETCH_CONTACT_REMOVE_SUCCESS = 'FETCH_CONTACT_REMOVE_SUCCESS'
export const FETCH_CONTACT_REMOVE_FAILURE = 'FETCH_CONTACT_REMOVE_FAILURE'

export const getContacts = () => async dispatch => {
  dispatch({type: FETCH_CONTACT_SENT})
  try{
    const response = await contactService.getContacts();
    console.log(response.data.Contacts)
    dispatch({type: FETCH_CONTACT_SUCCESS, payload: response.data.Contacts})
  } catch(err) {
    dispatch({type: FETCH_CONTACT_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const addContact = (data) => async dispatch => {
  dispatch({type: FETCH_CONTACT_ADD_SENT})
  try{
    const response = await contactService.addContact(data);
    dispatch({type: FETCH_CONTACT_ADD_SUCCESS, payload: response.data.Contact})
  } catch(err) {
    dispatch({type: FETCH_CONTACT_ADD_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const updateContact = (id, data) => async dispatch => {
  dispatch({type: FETCH_CONTACT_UPDATE_SENT})
  try{
    const response = await contactService.updateContact(id, data);
    dispatch({type: FETCH_CONTACT_UPDATE_SUCCESS, payload: {id: id, data: response.data.Contact}})
  } catch(err) {
    dispatch({type: FETCH_CONTACT_UPDATE_FAILURE, payload: err.message})
    console.log(err)
  }
}

export const removeContact = (id) => async dispatch => {
  dispatch({type: FETCH_CONTACT_REMOVE_SENT})
  try {
    await contactService.deleteContact(id)
    dispatch({type: FETCH_CONTACT_REMOVE_SUCCESS, payload: {id: id}})
  } catch (err){
    dispatch({type: FETCH_CONTACT_REMOVE_FAILURE, payload: err})
    console.log(err)
  }
}

export const getTypeContacts = () => async dispatch => {
  dispatch({type: FETCH_CONTACT_SENT})
  try{
    const response = await contactService.getTypeContacts();
    console.log(response.data.Contacts)
    dispatch({type: FETCH_CONTACT_SUCCESS, payload: response.data.Contacts})
  } catch(err) {
    dispatch({type: FETCH_CONTACT_FAILURE, payload: err.message})
    console.log(err)
  }
}