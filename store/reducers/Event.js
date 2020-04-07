import { FETCH_PROVO_EVENTS, FETCH_SLC_EVENTS } from '../actions/Event';

const initState = {
  events: [],
  markedItems: {},
  location: 'Provo'
}

const eventReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_PROVO_EVENTS:
      return { location: action.data.location, events: action.data.events };
    case FETCH_SLC_EVENTS:
      return { location: action.data.location, events: action.data.events };
    default:
      return state;
  }
}

export default eventReducer;
