// import {createStore} from 'redux'
import store, {getAccountHolders, getAvailableAccountHolders, getNewFields} from './redux/combineReducers';
import * as C from './redux/constants';
// import {html, render} from 'lit-html';
import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat';
import Header, {Header2} from './components/Header';
import Select from './components/Select';
import {
    appStyle, 
    appHeaderStyle, 
    flexContainerStyle, 
    flexChildStyle,
    accountHolderTextStyle
} from './styles';
import {selectOptions} from './options';
import guid from './util/guid';
//import request from './redux/actions/request';
import {getAccountHoldersFromService} from './redux/actions/async';

export default function app() {
   
    class UpdateHolders extends LitElement {
        constructor() {
            super();
            //this.localNumber = 0;
            this.holdersService();
        }
        static get properties() {
            return {
                accountHolders: {type: Array},
                availableAccountHolders: {type: Array},
                localNumber: {type: Number}
            };
        }

        addField() {
            store.dispatch({type: C.ADD_FIELD});
            this._invalidate();
        }

        updateRole(e) {
            let {id, value: newRole} = e.target;
            store.dispatch({type: C.UPDATE_ROLE, payload: {id, newRole}});
            this._invalidate();
        }
        addAccountHolder(e) {
            let {id: fieldId, value: memberNumber} = e.target;
            store.dispatch({type: C.ADD_ACCOUNT_HOLDER, payload: {fieldId, memberNumber}});
        }

        getHolders() {
            return getAccountHolders(store.getState());
        }
        getAvailableHolders() {
            return getAvailableAccountHolders(store.getState());
        }
        getNewAccountHolderFields() {
            return getNewFields(store.getState());
        }

        holdersService() {
            let p = new Promise((resolve, reject) => {
                getAccountHoldersFromService(store.dispatch, resolve, reject);
            });
            p.then((value) => {
                console.log('resolved: ', value);
                this._invalidate();
            }).catch((e) => console.log('Error: ', e)); //_invalidate(), show an error etc.   
        }

        render() {
            const title = 'Add /Remove V2';
            let availableAccountHolders = this.getAvailableHolders();
    
            let holders = repeat(this.getHolders(), (a) => a.id, (a, index) => {
                let id = a.id;
                return html`
                    <div style=${flexContainerStyle}>
                        <div style=${flexChildStyle}>
                            <div style=${accountHolderTextStyle}><span>Account Holder:<span></div>
                            <div style=${accountHolderTextStyle}><span>${a.firstName + ' ' + a.lastName}</span></div>
                        </div>
                        <div style=${flexChildStyle}>
                            <div style=${accountHolderTextStyle}><span>role:</span></div>
                            <div style=${accountHolderTextStyle}><span>${a.role}</span></div>
                        </div>
                        <div style=${flexChildStyle}>
                            <div style=${accountHolderTextStyle}><span>new role:</span></div>
                            <div style=${accountHolderTextStyle}>${Select(selectOptions, this.updateRole, id)}</div>
                        </div>
                    </div>
                `;
            });
            return html`
                <div style=${appStyle}>
                    <div>
                        ${Header(title, appHeaderStyle)}
                    </div>
                    <div>    
                        ${holders}
                    </div>
                    <hr />
                    ${ShowHolderChanges(this.getHolders())}
                    <hr />
                    <button @click=${this.addField}>Add a Field</button>
                    ${newHolderForm(this.getNewAccountHolderFields(), availableAccountHolders, this.addAccountHolder)}
                </div>
            `;
        }
    }
    customElements.define('update-holders', UpdateHolders);
}



function ShowHolderChanges(holders) {
    let holdersMarkup = repeat(holders, (a) => a.id, (a, index) => {
        return html`
            <div style=${flexContainerStyle}>
                <div style=${flexChildStyle}>
                    <div style=${accountHolderTextStyle}><span>${a.firstName + ' ' + a.lastName}</span></div>
                </div>
                <div style=${flexChildStyle}>
                    <div style=${accountHolderTextStyle}><span>new role: </span></div>
                </div>
                <div style=${flexChildStyle}>
                    <div style=${accountHolderTextStyle}><span>${a.newRole || 'Set a new role...'}</span></div>
                </div>
            </div>
        `;
    });
    return html`
        <div>
            <div>${Header2('Changes:', appHeaderStyle)}</div>
            <div>
                ${holdersMarkup}
            </div>
        </div>
    `;
}
//TODO --make a class?
function newHolderForm(newAccountHolderFields, availableAccountHolders, callback) {
    let realOptions = availableAccountHolders.filter((a) => !a.selected).map((a) => {
        let v = a.id;
        let d = a.name;
        return {value: v, displayName: d};
    });
    let options = [{value: '', displayName: ''}].concat(realOptions);
    
    if (newAccountHolderFields.length < 1) {
        return html`<p>Add someone...</p>`;
    } else {
        let mapBase = newAccountHolderFields.map((i) => {
            let o = {};
            o.uid = guid();
            return o;
        });
        let fieldList = repeat(mapBase, (o) => o.uid, (o) => {
            return html`
                <div>
                    ${Select(options, callback, o.uid)}
                </div>
            `;
        });
        return fieldList;
    }
}