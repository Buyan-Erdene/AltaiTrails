class TotalPrice extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .total-price-container {
                    font-family: 'Ubuntu', sans-serif;
                    margin: 10px 0;
                }
                h3 {
                    margin: 0;
                    font-size: 1.2em;
                }
                span {
                    font-weight: bold;
                    color: #2c3e50;
                }
            </style>
            <div class="total-price-container">
                <h3>Нийт үнэ: <span id="total-price">0</span> ₮</h3>
            </div>
            <div class="count-container">
                <h3>Нийт тоо: <span id="total-count">0</span></h3>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    updateTotalPrice(price) {
        const totalPriceSlot = this.shadowRoot.querySelector('#total-price');
        if (totalPriceSlot) {
            totalPriceSlot.textContent = price;
        }
    }

    updateTotalCount(count) {
        const totalCountSlot = this.shadowRoot.querySelector('#total-count');
        if (totalCountSlot) {
            totalCountSlot.textContent = count;
        }
    }
}

customElements.define('total-price-comp', TotalPrice);
