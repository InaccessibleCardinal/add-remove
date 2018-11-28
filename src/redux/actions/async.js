import request from './request';
import * as C from '../constants';

export const accountHolderMocks = [
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
export function extendWith(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
}
//no thunk?
export function getAccountHoldersFromService(dispatch, resolve, reject) {
    let url = 'https://jsonplaceholder.typicode.com/users';
    let config = {method: 'GET', url: url};
    request(config)
    .then((data) => {
        let accountHolders = data.slice(0, 3);
        let associatedPpl = data.slice(4, data.length);
        accountHolders.forEach((a, i) => {
            let nameParts = a.name.split(' ');
            a.firstName = nameParts[0];
            a.lastName = nameParts[1];
            extendWith(a, accountHolderMocks[i]);
        });
        associatedPpl.forEach((a, i) => {
            let nameParts = a.name.split(' ');
            a.firstName = nameParts[0];
            a.lastName = nameParts[1];
            let n = Math.random().toString().slice(2, 10);
            a.memberNumber = a.id = n;
        });
        dispatch({type: C.GET_ACCOUNT_HOLDERS_SUCCESS, payload: accountHolders});
        dispatch({type: C.GET_ASSOCIATED_SUCCESS, payload: associatedPpl});
        resolve('account holders success');
    })
    .catch((e) => {
        console.log('error: ', e);
        reject('account holders failure');
    }); 
}