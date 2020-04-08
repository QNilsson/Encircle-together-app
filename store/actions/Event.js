import Event from '../../models/event';
export const FETCH_PROVO_EVENTS = 'FETCH_PROVO_EVENTS';
export const FETCH_SLC_EVENTS = 'FETCH_SLC_EVENTS';
export const FETCH_TODAYS_EVENTS = 'FETCH_TODAYS_EVENTS';

export const fetchProvoEvents = (location) => {
  return async dispatch => {
    const CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    // set timeMin url parameter to beginning of month
    const yearMonth = `${yyyy}-${mm}`;
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${yearMonth}-01T00:00:00.000Z&key=${API_KEY}`;

    const response = await fetch(url);
    const resData = await response.json();
    const items = resData.items;
    const eventData = [];

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

    // for(const event in eventData) {
    //   console.log(eventData[event]);
    // }

    dispatch({ type: FETCH_PROVO_EVENTS, data: { location: location, events: eventData } });
  };
};

export const fetchSlcEvents = (location) => {
  return async dispatch => {
    const CALENDAR_ID = 'encircletogether.org_3231333930393634323835@resource.calendar.google.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today)

    // set timeMin url parameter to beginning of month
    const yearMonth = `${yyyy}-${mm}`;
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${yearMonth}-01T00:00:00.000Z&key=${API_KEY}`;

    const response = await fetch(url);
    const resData = await response.json();
    const items = resData.items;
    const eventData = [];

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

    // for(const event in eventData) {
    //   console.log(eventData[event]);
    // }

    dispatch({ type: FETCH_SLC_EVENTS, data: { location: location, events: eventData } });
  };
};

export const fetchTodaysEvents = (location) => {
  return async dispatch => {
    let CALENDAR_ID = '';
    
    if(location === 'Provo') {
      CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    } else if(location === 'Salt Lake City') {
      CALENDAR_ID = 'encircletogether.org_3231333930393634323835@resource.calendar.google.com';
    } else {
      CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    }

    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    // set timeMin url parameter to beginning of today
    today = yyyy + '-' + mm + '-' + dd;

    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=3&orderBy=startTime&singleEvents=true&timeMin=${today}T00:00:00.000Z&key=${API_KEY}`;

    const response = await fetch(url);
    const resData = await response.json();
    const items = resData.items;
    const eventData = [];

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

    // for(const event in eventData) {
    //   console.log(eventData[event]);
    // }

    dispatch({ type: FETCH_TODAYS_EVENTS, data: { location: location, events: eventData } });
  };
};
