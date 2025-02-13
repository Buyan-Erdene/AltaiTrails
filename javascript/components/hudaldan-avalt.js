        class HudaldanAvalt extends HTMLElement {
            constructor() {
                super();
                const template = document.getElementById("hudaldan-avalt-template").content;
                const shadowRoot = this.attachShadow({ mode: "open" });
                shadowRoot.appendChild(template.cloneNode(true));
            } connectedCallback() {
                const template = document.createElement("template");
                template.innerHTML = `
    <style>
        aside {
            border: 2px solid #ccc;
            padding: 1rem;
            border-radius: 8px;
            width: 300px;
            background-color: #f9f9f9;
        }
        h2 {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        button {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .buy-btn {
            background-color: #007bff;
            color: white;
        }
        .back-btn {
            background-color: #ddd;
        }
    </style>

    <aside aria-label="Order Summary">
        <h2>Захиалгын мэдээлэл</h2>
        <ul>
            <li>
                <span>Аяллын нэр : <slot name="aylal-name"></slot></span>
            </li>
            <li>
                <span>Үнэ : <slot name="aylal-price"></slot></span>
            </li>
        </ul>
        <button type="submit" class="buy-btn">Худалдан авах</button>
        <button type="button" class="back-btn">Буцах</button>
    </aside>
`;

const shadowRoot = this.shadowRoot;
shadowRoot.appendChild(template.content.cloneNode(true));

const aylalData = JSON.parse(this.getAttribute('aylal-data'));
const { name, price,} = aylalData;

const nameSlot = document.createElement("span");
nameSlot.setAttribute("slot", "aylal-name");
nameSlot.textContent = name;

// Сэтгэгдлийг slot-д оруулах
const priceSlot = document.createElement("span");
priceSlot.setAttribute("slot", "aylal-price");
priceSlot.textContent = price;

this.appendChild(nameSlot);
this.appendChild(priceSlot);

}
}

customElements.define('hudaldan-avalt', HudaldanAvalt);
