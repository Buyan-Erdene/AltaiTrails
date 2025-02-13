import { cartManager } from './modules/cart-manager.js';

class HadgalsanCount extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.updateCount();
    
    // Сагсны өөрчлөлтийг мэдээлэх
    cartManager.subscribe(() => {
      this.updateCount();
    });
  }

  // Сагсанд байгаа барааны тоог шинэчлэх
  updateCount() {
    const count = cartManager.getCount();
    this.shadowRoot.querySelector('#count').textContent = count;
  }

  // Компонентийг харуулах
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-size: var(--base-h2-font-size);
          font-weight: var(--base-bold-font-weight);
          color: var(--base-text-color);
          border-radius: var(--base-border-radius-x3);
          background: var(--base-color-grey-light);
        }
      </style>
      <span id="count">0</span>
    `;
  }
}

customElements.define('hadgalsan-count', HadgalsanCount);