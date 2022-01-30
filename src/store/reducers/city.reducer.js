import { cityConstants } from "../constants";

const init_state = {
    list: []
}

export function city(state = init_state, action) {
    let new_state = {};
    new_state["list"] = [...state["list"]];
    switch (action.type) {
        case cityConstants.GET_REQUEST:
            break;
        case cityConstants.GET_SUCCESS:
            new_state.list = action.data;
            break;
        case cityConstants.GET_FAILURE:
            break;
        default:
            break;
    }
    return new_state;
}