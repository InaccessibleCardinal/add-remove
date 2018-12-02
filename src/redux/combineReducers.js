//
import {createStore} from 'redux'
import {combineReducers} from 'redux';
import * as C from './constants';
import {updateArrayById, replaceInArrayByIndex, removeByIdentifier} from '../util/util';
import guid from '../util/guid';

const initialAccountState = {
    accountHolders: [],
    availableAccountHolders: [],
    newAccountHolders: [],
    newFields: []
};

export function accountStateReducer(state = initialAccountState, action) {
    switch (action.type) {
        
        //existing
        case C.GET_ACCOUNT_HOLDERS_SUCCESS: {
            let {payload} = action;
            return {...state, accountHolders: payload};
        }
        case C.UPDATE_ROLE: {
            let {id, newRole} = action.payload;
            let updatedHolders = updateArrayById(state.accountHolders, id, [{changeKey: 'newRole', changeValue: newRole}]);
            return {...state, accountHolders: updatedHolders};
        }
        //associated
        case C.GET_ASSOCIATED_SUCCESS: {
            let {payload} = action;
            return {...state, availableAccountHolders: payload};
        }
        case C.ADD_ACCOUNT_HOLDER: {

            let {fieldId, memberNumber} = action.payload;
            let {newAccountHolders, availableAccountHolders} = state;
            let temp = availableAccountHolders.find((a) => a.memberNumber === memberNumber);
            let index1 = availableAccountHolders.indexOf(temp);
            let newHolder = {...temp, fieldId: fieldId, selected: true};
            let existing = newAccountHolders.find((a) => a.fieldId === fieldId);

            if (existing) {
                
                if (existing.memberNumber === newHolder.memberNumber) {
                    return state; //no change, do nothing
                } else {
                    //replace existing
                    let existingDeselected = {...existing, selected: false, fieldId: ''};
                    
                    let index2 = newAccountHolders.indexOf(existing);                    
                    let index3 = availableAccountHolders.indexOf(existing);
                    let updatedNewHolders = replaceInArrayByIndex(newAccountHolders, newHolder, index2);
                    let updatedAvailable1 = replaceInArrayByIndex(availableAccountHolders, newHolder, index1);
                    let updatedAvailable2 = replaceInArrayByIndex(updatedAvailable1, existingDeselected, index3);

                    return {
                        ...state, 
                        newAccountHolders: updatedNewHolders, 
                        availableAccountHolders: updatedAvailable2
                    };
                }
                
            } else { //just add

                return {
                    ...state, 
                    newAccountHolders: newAccountHolders.concat([newHolder]),
                    availableAccountHolders: replaceInArrayByIndex(availableAccountHolders, newHolder, index1)
                };

            }
           
        }
        case C.UPDATE_NEW_ROLE: {
            return state;
        }
        //fields
        case C.ADD_FIELD: {
            let newFields = state.newFields.concat([{uid: guid()}]);
            return {...state, newFields};
          
        }
        case C.REMOVE_FIELD: {
            let newFields = state.newFields;
            let uid = action.payload;
            return {...state, newFields: removeByIdentifier(newFields, 'uid', uid)};
        }

        default: {
            return state;
        }
    }
}

export function getAccountHolders(state) {
    return state.accountState.accountHolders;
}

export function getAvailableAccountHolders(state) {
    return state.accountState.availableAccountHolders;
}

export function getAvailableAccountHoldersNotSelected(state) {
    return state.accountState.availableAccountHolders.filter((a) => !a.selected);
}

export function getNewAccountHolders(state) {
    return state.accountState.newAccountHolders;
}

export function getNewFields(state) {
    return state.accountState.newFields;
}

const root = combineReducers({
    accountState: accountStateReducer 
});

function configureStore() {
    return createStore(root, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = configureStore();

export default store;