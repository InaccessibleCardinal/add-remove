import {html} from 'lit-html';
import {repeat} from 'lit-html/directives/repeat';
//Select.js
export default function Select(options, callback, id) {
    const optionTags = repeat(options, (opt) => opt.id, (opt) => {
        return html`
            <option value=${opt.value}>${opt.displayName}</option>
        `;
    });
    return html`
        <select id=${id} @change=${callback}>
            ${optionTags}
        </select>
    `;
}