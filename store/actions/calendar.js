import Event from '../../models/event';

export const GET_EVENTS = 'GET_EVENTS';

export const getEvents = () => {
    return async dispatch => {
        const CALENDAR_ID = 'jn.web.developer%40gmail.com';
        const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ '
        let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=1&key=${API_KEY}`;
        const res = await fetch(url);
        const resData = await res.json();
        console.log(resData);
        const setEvents = [];
        for(const key in resData) {
            setEvents.push(new Event(key, resData[key].summary, resData[key].description, resData[key].start, resData[key].end));
        }
        dispatch({type: GET_EVENTS, events: setEvents});
    }
}