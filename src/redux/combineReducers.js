//
import {combineReducers} from 'redux';
import {availableAccountHolders} from '../data/accountHolders';
import * as C from './constants';

export function holdersReducer(state = [], action) {
    switch (action.type) {
        case C.GET_ACCOUNT_HOLDERS_SUCCESS: {
console.log('in reducer: ',action.payload)
            return [...action.payload];
        }
        case C.UPDATE_ROLE: {
            let {id, newRole} = action.payload;
            return updateArrayById(state, id, [{changeKey: 'newRole', changeValue: newRole}]);
        }
        default: {
            return state;
        }
    }
}

export function getAccountHolders(state) {
    return state.accountHolders;
}

export function availableHoldersReducer(state = availableAccountHolders, action) {
    switch (action.type) {
        case C.UPDATE_NEW_ROLE: {
            return state;
        }
        default: {
            return state;
        }
    }
}

export function getAvailableAccountHolders(state) {
    return state.availableAccountHolders;
}

export function getAvailableAccountHoldersNotSelected(state) {
    return state.availableAccountHolders.filter((a) => !a.selected);
}


let count = 0;
export function fakeCountReducer(state = count, action) {
    if (action.type === 'ADD') {
        return state + 1;
    } else if (action.type === 'SUBTRACT') {
        return state - 1;
    } else {
        return state;
    }
}

export function getCounter(state) {
    return state.counter;
}
const root = combineReducers({
    accountHolders: holdersReducer,
    availableAccountHolders: availableHoldersReducer,
    counter: fakeCountReducer
});

export default root;


//util
function updateArrayById(arrayToUpdate, id, arrayOfChanges) {
    let len = arrayToUpdate.length;
    let objToUpdate = arrayToUpdate.find((o) => o.id === id);
    let index = arrayToUpdate.indexOf(objToUpdate);
    let updatedObj = {...objToUpdate};
    arrayOfChanges.forEach((changeObj) => {
        let {changeKey, changeValue} = changeObj;
        updatedObj[changeKey] = changeValue;
    });
    return arrayToUpdate.slice(0, index).concat([updatedObj], arrayToUpdate.slice(index + 1, len));
}