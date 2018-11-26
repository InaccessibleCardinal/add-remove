//
import {combineReducers} from 'redux';
import {accountHolders, availableAccountHolders} from '../data/accountHolders';
import * as C from './constants';
export function holdersReducer(state = accountHolders, action) {
    switch (action.type) {
        case C.UPDATE_ROLE: {
            let {id, newRole} = action.payload;
            return updateArrayById(state, id, [{changeKey: 'newRole', changeValue: newRole}]);
        }
        default: {
            return state;
        }
    }
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

const root = combineReducers({
    accountHolders: holdersReducer,
    availableAccountHolders: availableHoldersReducer
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