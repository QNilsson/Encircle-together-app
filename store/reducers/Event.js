import { FETCH_PROVO_EVENTS, FETCH_SLC_EVENTS, MARK_ITEMS } from '../actions/Event';

const initState = {
  events: [],
  markedItems: {}
}

const eventReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_PROVO_EVENTS:
      return { events: action.events };
    case FETCH_SLC_EVENTS:
      return { events: action.events };
    default:
      return state;
  }
}

export default eventReducer;
