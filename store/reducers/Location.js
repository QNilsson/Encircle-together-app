import { SET_LOCATION } from "../actions/Location"

const initState = {
    location: undefined
}

const locationReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_LOCATION:
            const location = action.location;
            return { ...state, location: location };
        default:
            return state;
    }
}

export default locationReducer; 