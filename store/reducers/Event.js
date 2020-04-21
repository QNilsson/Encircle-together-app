import { FETCH_PROVO_EVENTS, FETCH_SLC_EVENTS, FETCH_TODAYS_EVENTS } from '../actions/Event';

const initState = {
  events: [],
  todaysEvents: [],
  markedItems: {},
  location: 'Provo'
}

const eventReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_PROVO_EVENTS:
      return { ...state, location: action.data.location, events: action.data.events };
    case FETCH_SLC_EVENTS:
      return { ...state, location: action.data.location, events: action.data.events };
    case FETCH_TODAYS_EVENTS:
      return { ...state, location: action.data.location, todaysEvents: action.data.events };
    default:
      return state;
  }
}

export default eventReducer;
