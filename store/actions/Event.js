import Event from '../../models/event';
export const FETCH_PROVO_EVENTS = 'FETCH_PROVO_EVENTS';

export const fetchProvoEvents = () => {
  return async dispatch => {
    const CALENDAR_ID = 'encircletogether.org_3739393730353231353232@resource.calendar.google.com';
    const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ';
    const DATE = new Date().toISOString();

    // set timeMin url parameter to beginning of month
    const splitDATE = DATE.split('-', 2);
    const yearMonth = `${splitDATE[0]}-${splitDATE[1]}`;
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=15&orderBy=startTime&singleEvents=true&timeMin=${yearMonth}-01T00:00:00.000Z&key=${API_KEY}`;

    const response = await fetch(url);
    const resData = await response.json();
    const items = resData.items;
    const eventData = [];

    for(const key in items) {
      eventData.push(
        new Event(
          events[key].id,
          events[key].creator.email,
          events[key].description,
          events[key].end.dateTime,
          events[key].start.dateTime,
          events[key].summary,
          events[key].location
        )
      );
    }

        for(const event in eventData) {
          console.log(eventData[event]);
        }
        console.log(eventData)

        dispatch({ type: FETCH_PROVO_EVENTS, events: eventData})
  };
};
