export const GET_EVENTS = 'GET_EVENTS';

export const getEvents = () => {
    return async dispatch => {
        const CALENDAR_ID = 'jn.web.developer%40gmail.com';
        const API_KEY = 'AIzaSyDg7_XJNVaiMIOkgSqZfZ6ivpBhnyv6UIQ '
        let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
        const res = await fetch(url);
        const resData = await res.json();
        console.log(resData);
        const setEvents = resData;
        dispatch({type: GET_EVENTS, events: setEvents});
    }
}