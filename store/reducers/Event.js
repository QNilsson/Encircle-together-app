import { FETCH_PROVO_EVENTS } from '../actions/Event';

const initState = {
  events: []
}

const eventReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_PROVO_EVENTS: {
      return { events: action.events };
    }
    default:
      return state;
  }
}
