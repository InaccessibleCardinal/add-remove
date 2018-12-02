import {html} from '@polymer/lit-element';
import {repeat} from 'lit-html/directives/repeat';
import Select from './Select';
import {
    flexContainerStyle, 
    flexChildStyle,
    accountHolderTextStyle
} from '../styles';
import {selectOptions} from '../options';

export default function NewHolderForm(newAccountHolderFields, availableAccountHolders, callback) {
 
    let realOptions = availableAccountHolders.map((a) => {
        let v = a.id;
        let d = a.name;
        return {value: v, displayName: d};
    });
    let options = [{value: '', displayName: ''}].concat(realOptions);
    
    if (newAccountHolderFields.length < 1) {
        return html`<p>Add someone...</p>`;
    } else {
        
        let fieldList = repeat(newAccountHolderFields, (o) => o.uid, (o) => {
            return html`
                <div style=${flexContainerStyle}>
                    <div style=${flexChildStyle}>
                        <div style=${accountHolderTextStyle}><span>new holder:</span></div>
                        ${Select(options, callback, o.uid)}
                    </div>
                    <div style=${flexChildStyle}>
                        <div style=${accountHolderTextStyle}><span>new role:</span></div>
                        ${Select(selectOptions, () => {}, 'role_' + o.uid)}
                    </div>
                </div>
            `;
        });
        return fieldList;
    }
}