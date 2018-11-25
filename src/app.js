import {createStore} from 'redux'
import root from './redux/combineReducers';
import {html, render} from 'lit-html';
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

//TODO import from a handlers/actions directory
function selectHandler(e) {
    console.log(e.target.id);
    console.log(e.target.value);
}



function configureStore() {
    return createStore(root);
}
const store = configureStore();

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
    render(Page('Add / Remove Account Holders'), body);
}