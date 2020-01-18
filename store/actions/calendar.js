export const GET_EVENTS = 'GET_EVENTS';

export const getEvents = () => {
    return dispatch => {
        const CALENDAR_ID = '10528790%40my.uvu.edu';
        const API_KEY = 'AIzaSyCTJREaL9fmCPHR0uC4m0q05l9npRVnK_I';
        const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;
        const res = await fetch(url);
        const resData = await res.json();
        // .then((res) => res.json())
        // .then((resJson) => {
        //     this.setState({
        //     dataSource: [...this.state.dataSource, ...resJson.items],
        //     });
        // })
        // .catch(error => {
        //     console.log(error);
        // });
        dispatch({type: GET_EVENTS, events: []})
    }
}