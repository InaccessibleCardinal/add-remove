import request from './request';
import * as C from '../constants';

let mocks = [
    {   
        memberNumber: '23457884', 
        role: 'primary',
        id: '23457884'
    },
    {
        memberNumber: '23457885', 
        role: 'joint-secondary',
        id: '23457885'
    },
    {
        memberNumber: '23457887',  
        role: 'joint-secondary',
        id: '23457887'
    }
];
//util
function extendWith(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
}
//no thunk?
export function getAccountHoldersFromService(dispatch) {
    let url = 'https://jsonplaceholder.typicode.com/users';
    let config = {method: 'GET', url: url};
    request(config)
    .then((data) => {
        let ah = data.slice(0, 3);
        ah.forEach((a, i) => {
            let nameParts = a.name.split(' ');
            extendWith(a, mocks[i]);
            a.firstName = nameParts[0];
            a.lastName = nameParts[1];
        });
        dispatch({type: C.GET_ACCOUNT_HOLDERS_SUCCESS, payload: ah});
    })
    .catch((e) => console.log('error: ', e)); 
}