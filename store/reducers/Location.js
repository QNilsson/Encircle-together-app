import { SET_LOCATION } from '../actions/Location';

const initState = {
  location: 'Provo'
}

const locationReducer = (state = initState, action) => {
  switch(action.type) {
    case SET_LOCATION:
      return { location: action.location };
    default:
      return state;
  }
}

export default locationReducer;
