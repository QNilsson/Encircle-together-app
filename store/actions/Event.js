// imports event model used to load eventData array
import Event from '../../models/event';
export const FETCH_PROVO_EVENTS = 'FETCH_PROVO_EVENTS';
export const FETCH_SLC_EVENTS = 'FETCH_SLC_EVENTS';
export const FETCH_TODAYS_EVENTS = 'FETCH_TODAYS_EVENTS';

// events for calendar screen
export const fetchProvoEvents = (location) => {
  return async dispatch => {
    // provo encircle google calendar id
    const CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    // google api key
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';

    // sets date to today
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // sets timeMin url parameter to first day of current month
    const yearMonth = `${yyyy}-${mm}`;
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=100&orderBy=startTime&singleEvents=true&timeMin=${yearMonth}-01T00:00:00.000Z&key=${API_KEY}`;

    const response = await fetch(url);
    const resData = await response.json();
    // stores unpackaged response data
    const items = resData.items;
    // stores event objects
    const eventData = [];

    // loads array with event objects
    for(const key in items) {
      eventData.push(
        new Event(
          items[key].id,
          items[key].creator.email,
          items[key].description,
          items[key].end.dateTime,
          items[key].start.dateTime,
          items[key].summary,
          items[key].location
        )
      );
    }

    // use this to see loaded event objects
    for(const event in eventData) {
    //   console.log(eventData[event]);
    }

    // async dispatch - sends location and event object array to event reducer
    dispatch({ type: FETCH_PROVO_EVENTS, data: { location: location, events: eventData } });
  };
};

// events for calendar screen
export const fetchSlcEvents = (location) => {
  return async dispatch => {
    // slc encircle google calendar id
    const CALENDAR_ID = 'encircletogether.org_3231333930393634323835@resource.calendar.google.com';
    // google api key
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';

    // sets date to today
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // sets timeMin url parameter to first day of current month
    const yearMonth = `${yyyy}-${mm}`;
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=100&orderBy=startTime&singleEvents=true&timeMin=${yearMonth}-01T00:00:00.000Z&key=${API_KEY}`;

    const response = await fetch(url);
    const resData = await response.json();
    // stores unpackaged response data
    const items = resData.items;
    // stores event objects
    const eventData = [];

    // loads array with event objects
    for(const key in items) {
      eventData.push(
        new Event(
          items[key].id,
          items[key].creator.email,
          items[key].description,
          items[key].end.dateTime,
          items[key].start.dateTime,
          items[key].summary,
          items[key].location
        )
      );
    }

    // use this to see loaded event objects
    for(const event in eventData) {
      // console.log(eventData[event]);
    }

    // async dispatch - sends location and event object array to event reducer
    dispatch({ type: FETCH_SLC_EVENTS, data: { location: location, events: eventData } });
  };
};

export const fetchStGEvents = (location) => {
  return async dispatch => {
    // slc encircle google calendar id
    const CALENDAR_ID = 'encircletogether.org_3231333930393634323835@resource.calendar.google.com';
    // google api key
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';

    // sets date to today
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // sets timeMin url parameter to first day of current month
    const yearMonth = `${yyyy}-${mm}`;
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=100&orderBy=startTime&singleEvents=true&timeMin=${yearMonth}-01T00:00:00.000Z&key=${API_KEY}`;

    const response = await fetch(url);
    const resData = await response.json();
    // stores unpackaged response data
    const items = resData.items;
    // stores event objects
    const eventData = [];

    // loads array with event objects
    for(const key in items) {
      eventData.push(
        new Event(
          items[key].id,
          items[key].creator.email,
          items[key].description,
          items[key].end.dateTime,
          items[key].start.dateTime,
          items[key].summary,
          items[key].location
        )
      );
    }

    // use this to see loaded event objects
    for(const event in eventData) {
      // console.log(eventData[event]);
    }

    // async dispatch - sends location and event object array to event reducer
    dispatch({ type: FETCH_SLC_EVENTS, data: { location: location, events: eventData } });
  };
};

// events for dashboard screen
export const fetchTodaysEvents = (location) => {
  return async dispatch => {
    let CALENDAR_ID = '';
    
    // sets calendar id to correct calendar based on location (provo default)
    if(location === 'Provo') {
      CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    } else if(location === 'Salt Lake City') {
      CALENDAR_ID = 'encircletogether.org_3231333930393634323835@resource.calendar.google.com';
    } else {
      CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    }

    // google api key
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';

    // sets date to today
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    // sets timeMin url parameter to first day of current month
    today = yyyy + '-' + mm + '-' + dd;

    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=3&orderBy=startTime&singleEvents=true&timeMin=${today}T00:00:00.000Z&key=${API_KEY}`;

    const response = await fetch(url);
    const resData = await response.json();
    // stores unpackaged response data
    const items = resData.items;
    // stores event objects
    const eventData = [];

    // loads array with event objects
    for(const key in items) {
      
      eventData.push(
        new Event(
          items[key].id,
          items[key].creator.email,
          items[key].description,
          items[key].end.dateTime,
          items[key].start.dateTime,
          items[key].summary,
          items[key].location
        )
      );
        
    }

    // use this to see loaded event objects
    for(const event in eventData) {
      // console.log(eventData[event]);
    }

    // async dispatch - sends location and event object array to event reducer
    dispatch({ type: FETCH_TODAYS_EVENTS, data: { location: location, events: eventData } });
  };
};
