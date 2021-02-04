// imports event store actions
import {
  FETCH_PROVO_EVENTS,
  FETCH_SLC_EVENTS,
  FETCH_TODAYS_EVENTS,
} from "../actions/Event";

const initState = {
  // events for calendar screen
  events: [],
  // events for dashboard screen
  todaysEvents: [],
  // location (default provo)
  location: "",
};

const eventReducer = (state = initState, action) => {
  // sets app state to values sent from event store actions
  switch (action.type) {
    case FETCH_PROVO_EVENTS:
      return {
        ...state,
        location: action.data.location,
        events: action.data.events,
      };
    case FETCH_SLC_EVENTS:
      return {
        ...state,
        location: action.data.location,
        events: action.data.events,
      };
    case FETCH_SLC_EVENTS:
      return {
        ...state,
        location: action.data.location,
        events: action.data.events,
      };
    case FETCH_TODAYS_EVENTS:
      return {
        ...state,
        location: action.data.location,
        todaysEvents: action.data.events,
      };
    default:
      return state;
  }
};

export default eventReducer;
