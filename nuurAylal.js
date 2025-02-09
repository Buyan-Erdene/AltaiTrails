class nuurAylal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.zurag = this.getAttribute("zurag");
        this.productName = this.getAttribute("ner") || "Нэргүй бараа";
        this.tailbar = this.getAttribute("tailbar");
        this.productLikes = this.getAttribute("likes") || 0;
        this.productDisLikes = this.getAttribute("dislikes") || 0;
        this.#render();
        window.addEventListener("shp-reacted", e => {
            this.reactionClicked(e.detail.type);
        });
    }

    #render() {
        this.innerHTML = `
        <article class="shp-product">
            <img src=${this.zurag} alt="Tour Image">
            <h3>${this.productName}</h3>
            <p>${this.tailbar}</p>
            <shp-reaction icn="👍🏻" cnt="${this.productLikes}"></shp-reaction>
            <shp-reaction icn="👎🏻" cnt="${this.productDisLikes}"></shp-reaction>
        </article>`;
    }

    reactionClicked(isReacted) {
        this.querySelector("article").classList.toggle("reacted");
    }

    disconnectedCallback() {}

    attributeChangedCallback(name, oldVal, newVal) {}

    adoptedCallback() {}
}

window.customElements.define('shp-product', nuurAylal);

async function loadData() {
    try {
        const result = await fetch("https://api.jsonbin.io/v3/b/677de2a5acd3cb34a8c5cc15");
        const data = await result.json();
        const products = data.record;
        const container = document.getElementById("aylluud");

        products.forEach(product => {
            const productElement = document.createElement("shp-product");
            productElement.setAttribute("zurag", product.image);
            productElement.setAttribute("ner", product.title);
            productElement.setAttribute("tailbar", product.description);
            container.appendChild(productElement);
        });
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

window.addEventListener("DOMContentLoaded", loadData);