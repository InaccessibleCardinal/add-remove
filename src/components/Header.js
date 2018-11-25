import {html, render} from 'lit-html';
//Header.js
export default function Header(title, titleStyle) {
    return html`<h1 style=${titleStyle}>${title}</h1>`;
}