export const GET_EVENTS = 'GET_EVENTS';

export const getEvents = () => {
    return async dispatch => {
        const CALENDAR_ID = '10528790%40my.uvu.edu';
        const API_KEY = 'AIzaSyCTJREaL9fmCPHR0uC4m0q05l9npRVnK_I';
        let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
        const res = await fetch(url);
        const resData = await res.json();
        console.log(resData);
        const setEvents = resData;
        dispatch({type: GET_EVENTS, events: setEvents});
    }
}