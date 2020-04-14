import { FETCH_RESOURCES } from '../actions/Resource';

const initState = {
  resources: []
}

const resourceReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_RESOURCES:
      return { resources: action.resources }
    default:
      return state;
  }
};

export default resourceReducer;