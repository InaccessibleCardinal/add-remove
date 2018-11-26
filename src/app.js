import {createStore} from 'redux'
import root, {getCounter} from './redux/combineReducers';
import * as C from './redux/constants';
import {html, render} from 'lit-html';
import {LitElement, html as lHtml} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat';
import Header from './components/Header';
import Select from './components/Select';
import {
    appStyle, 
    appHeaderStyle, 
    flexContainerStyle, 
    flexChildStyle,
    accountHolderTextStyle
} from './styles';
import {selectOptions} from './options';

function configureStore() {
    return createStore(root, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = configureStore();
//TODO import from a handlers/actions directory
function selectHandler(e) {
    let {id, value: newRole} = e.target;
    store.dispatch({type: C.UPDATE_ROLE, payload: {id, newRole}});
}

export default function app() {
    
    const body = document.body;
    let accountHolders = store.getState().accountHolders;
    
    let acctHolders = repeat(accountHolders, (a) => a.memberNumber, (a, index) => {
        let id = a.memberNumber;
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
                    <div style=${accountHolderTextStyle}>${Select(selectOptions, selectHandler, id)}</div>
                </div>
            </div>
        `;
    });
    
    function Page(title) {
        return html`
            <div style=${appStyle}>
                <div>
                    ${Header(title, appHeaderStyle)}
                </div>
                <div>    
                    ${acctHolders}
                </div>
            </div>
        `;
    }
       
    render(Page('Add / Remove Account Holders'), document.getElementById('test1'));
}

//try to get redux changes reflecting in this shitshow
let counter = store.getState().counter;
class XSample extends LitElement {
   //need a constructor with this.attachShadow??
    static get properties() {
        return {
            counter: {type: Number}
        };
    }
    add() {
        store.dispatch({type: 'ADD'});
        this._invalidate(); 
    }
    subtract() {
        store.dispatch({type: 'SUBTRACT'});
        this._invalidate(); 
    }
    getCount() {
       return getCounter(store.getState()); 
    }
    render() {
        return lHtml`
        <style>button:hover {cursor: pointer}</style>
            <div>
                <button @click=${this.subtract}>SUBTRACT</button>
                <button @click=${this.add}>ADD</button>            
                <h1>${this.getCount()}</h1>
                <p>Some DOM that better not be changing...otherwise, what's the point.</p>
            </div>
        `;
    }
}
customElements.define('x-sample', XSample);