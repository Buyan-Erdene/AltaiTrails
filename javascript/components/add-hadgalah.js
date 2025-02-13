class AddHadgalah extends HTMLElement {
    constructor() {
        super();
        this.hadgalsan = false; 
    }

    connectedCallback() {
        this.id = this.getAttribute("did");
        this.hadgalsan = cartManager.cart.includes(this.id); 
        this.render();
        this.addEventListener("click", this.hadgalahbutton.bind(this));
    }

    hadgalahbutton() {
        const aylalId = this.id;

        if (this.hadgalsan) {
            cartManager.removeItem(aylalId); 
        } else {
            cartManager.addItem(aylalId); 
        }

        this.hadgalsan = cartManager.cart.includes(this.id); 
        this.updateButton();

        const event = new CustomEvent("aylal-hadgalah", {
            bubbles: true,
            detail: { aylalId, hadgalsan: this.hadgalsan }
        });
        this.dispatchEvent(event);
    }

    updateButton() {
        const addTovch = this.querySelector(".heart-icon");
        addTovch.style.fill = this.hadgalsan ? "var(--main)" : "#FD9545";
    }

    render() {
        this.innerHTML = `
        <button style="padding: 5px" class="love" data-id="${this.id}" aria-label="love" onclick="event.preventDefault();">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            stroke="var(--base-color-dark-grey)"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="heart-icon"
            style="width: 24px; height: 24px;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 20.49l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" ></path>
          </svg>
        </button>
        `;
        this.updateButton();
    }
}

customElements.define('add-hadgalah', AddHadgalah);