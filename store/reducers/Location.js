import { SET_LOCATION } from '../actions/Location';
/*
let initState = {
    location: 'provo'
}
*/
const locationReducer = (state = 'Provo', action) => {
    switch(action.type) {
        case SET_LOCATION:
            let location = action.location;
            return { ...state, location: location };
        default:
            return state;
    }
}

export default locationReducer;
