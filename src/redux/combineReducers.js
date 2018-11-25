//
import {combineReducers} from 'redux';
import {accountHolders, availableAccountHolders} from '../data/accountHolders';

export function holdersReducer(state = accountHolders, action) {
    switch (action.type) {
        case 'UPDATE_ROLE': {
            return {...state};
        }
        default: {
            return state;
        }
    }
}

export function availableHoldersReducer(state = availableAccountHolders, action) {
    switch (action.type) {
        case 'UPDATE_NEW_ROLE': {
            return {...state};
        }
        default: {
            return state;
        }
    }
}

const root = combineReducers({
    accountHolders: holdersReducer,
    availableAccountHolders: availableHoldersReducer
});

export default root;