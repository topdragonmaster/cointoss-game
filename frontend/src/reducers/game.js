import { UPDATEBALANCE, UPDATEHISTORY, INITIALIZEHISTORY } from '../constants/actionTypes';

const gameReducer = (state = { history: [], balance: 0 }, action) => {
    switch (action.type) {
        case UPDATEBALANCE:
            return { ...state, balance: action.data.balance };

        case UPDATEHISTORY:
            const newHistory = [action.data, ...state.history]
            return { ...state, history:  newHistory.slice(0, 10)};

        case INITIALIZEHISTORY:
            return { ...state, history:  action.data};

        default:
            return state;
    }
}
export default gameReducer;