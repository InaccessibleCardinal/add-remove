//
import {createStore} from 'redux'
import {combineReducers} from 'redux';
import * as C from './constants';
import {updateArrayById} from '../util/util';

const initialAccountState = {
    accountHolders: [],
    availableAccountHolders: []
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
        case C.UPDATE_NEW_ROLE: {
            return state;
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

const initialNewFields = [];

export function newFieldsReducer(state = initialNewFields, action) {

    switch(action.type) {

        case C.ADD_FIELD: {
            if (state.length === 0) {
                return state.concat([0]);
            } else {
                let max = Math.max.apply(null, state);
                return state.concat([max + 1]);
            }
        }
        case C.REMOVE_FIELD: {
            return state;
        }

        default: {
            return state;
        }
    }
}

export function getNewFields(state) {
    return state.newFields;
}

const root = combineReducers({
    accountState: accountStateReducer,
    newFields: newFieldsReducer 
});

function configureStore() {
    return createStore(root, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = configureStore();

export default store;