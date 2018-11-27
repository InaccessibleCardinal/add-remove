import {LitElement, html as lHtml} from '@polymer/lit-element';
export default class XSample extends LitElement {
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