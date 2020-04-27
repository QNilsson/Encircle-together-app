// imports resource store actions
import { FETCH_RESOURCES } from '../actions/Resource';

const initState = {
  // resources for dashboard screen
  resources: []
}

const resourceReducer = (state = initState, action) => {
  // sets app state to values sent from resource store actions
  switch(action.type) {
    case FETCH_RESOURCES:
      return { resources: action.resources }
    default:
      return state;
  }
};

export default resourceReducer;