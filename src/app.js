import store, {
    getAccountHolders, 
    getAvailableAccountHolders, 
    getNewFields, 
    getNewAccountHolders
} from './redux/combineReducers';
import * as C from './redux/constants';
import {LitElement, html} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat';
import Header from './components/Header';
import Select from './components/Select';
import NewHolderForm from './components/NewHolderForm';
import ShowHolderChanges from './components/ShowHolderChanges';
import {
    appStyle, 
    appHeaderStyle, 
    flexContainerStyle, 
    flexChildStyle,
    accountHolderTextStyle
} from './styles';
import {selectOptions} from './options';

import {getAccountHoldersFromService} from './redux/actions/async';

export default function app() {
   
    class UpdateHolders extends LitElement {
        constructor() {
            super();
            this.holdersService();
        }
        static get properties() {
            return {
                accountHolders: {type: Array},
                availableAccountHolders: {type: Array}
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
            this._invalidate();
        }

        getHolders() {
            return getAccountHolders(store.getState());
        }
        getAvailableHolders() {
            return getAvailableAccountHolders(store.getState());
        }
        getNewHolders() {
            return getNewAccountHolders(store.getState());
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
                    <button @click=${this.addField}>Add a Field</button>
                    ${NewHolderForm(this.getNewAccountHolderFields(), availableAccountHolders, this.addAccountHolder)}
                    <hr />
                    ${ShowHolderChanges(this.getHolders(), this.getNewHolders())}
                </div>
            `;
        }
    }
    customElements.define('update-holders', UpdateHolders);
}