import {html, render} from 'lit-html';
//Header.js
export default function Header(title, titleStyle) {
    return html`<h1 style=${titleStyle}>${title}</h1>`;
}

export function Header2(title, titleStyle) {
    return html`<h2 style=${titleStyle}>${title}</h2>`;
}

export function Header3(title, titleStyle) {
    return html`<h3 style=${titleStyle}>${title}</h3>`;
}

export function Header4(title, titleStyle) {
    return html`<h4 style=${titleStyle}>${title}</h4>`;
}