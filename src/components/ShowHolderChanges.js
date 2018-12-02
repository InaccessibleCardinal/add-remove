import {html} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {Header2} from './Header';
import {
    appHeaderStyle, 
    flexContainerStyle, 
    flexChildStyle,
    accountHolderTextStyle
} from '../styles';

export default function ShowHolderChanges(holders) {
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