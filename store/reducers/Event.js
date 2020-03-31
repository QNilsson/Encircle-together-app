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
    // case MARK_ITEMS:
    //   const events = [...state.events];
    //   const items = {};
    //   events.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true });
    //   // for(const i in action.events) {
    //   //   console.log(action.events[i])
    //   // }
    //   // action.events.forEach(e => items[e.start__dateTime.split('T')[0]] = { marked: true });
    //   return { ...state, markedItems: items };
    default:
      return state;
  }
}

export default eventReducer;
