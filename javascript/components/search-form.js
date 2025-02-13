class SearchForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        
        this.addEventListener('setParams', (event) => {
            this.setSearchParams(event.detail);
        });
    }

    setSearchParams(params) {
        const { month, duration, location, type, price } = params;
        
        const shadow = this.shadowRoot;
        if (month) shadow.getElementById("travel-month").value = month;
        if (duration) {
            shadow.getElementById("duration").value = duration;
            shadow.getElementById("duration-value").textContent = duration;
        }
        if (location) shadow.getElementById("location").value = location;
        if (type) shadow.getElementById("type").value = type;
        if (price) {
            shadow.getElementById("price").value = price;
            shadow.getElementById("price-value").textContent = price;
        }
    }

    setupEventListeners() {
        const shadow = this.shadowRoot;
        
        shadow.querySelector(".search-button").addEventListener("click", () => {
            this.handleSearch();
        });

        shadow.querySelector("#duration").addEventListener("input", (e) => {
            shadow.querySelector("#duration-value").textContent = e.target.value;
            this.handleSearch();
        });

        shadow.querySelector("#price").addEventListener("input", (e) => {
            shadow.querySelector("#price-value").textContent = e.target.value;
            this.handleSearch();
        });

        ['travel-month', 'location', 'type'].forEach(id => {
            shadow.getElementById(id).addEventListener('change', () => this.handleSearch());
        });
    }

    getSearchParams() {
        const shadow = this.shadowRoot;
        return {
            month: shadow.querySelector("#travel-month").value,
            duration: shadow.querySelector("#duration").value,
            location: shadow.querySelector("#location").value,
            type: shadow.querySelector("#type").value,
            price: shadow.querySelector("#price").value,
        };
    }

    handleSearch() {
        const searchParams = this.getSearchParams();
        this.dispatchEvent(new CustomEvent("search", { 
            detail: searchParams,
            bubbles: true,
            composed: true
        }));
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
        .search-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
                    background-color: var(--sectioncolor);
                    border-radius: 1rem;
                    }

                .search-form label {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    }
                    
                    .search-form select,
                    .search-form input[type="range"] {
                    width: 100%;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    border: 1px solid var(--maincolor);
                    }
                    
                    .search-button {
                        background-color: var(--maincolor);
                        color: var(--darkfont);
                        padding: 0.75rem;
                        border: none;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        }
                        
                .search-button:hover {
                    background-color: var(--darkfont);
                    color: var(--maincolor);
                    }
                    </style>

            <div class="search-form">
                <label for="travel-month">Аялах сар</label>
                <select id="travel-month">
                <option value="">Аялах сараа сонгоно уу</option>
                <option value="january">1-р сар</option>
                <option value="february">2-р сар</option>
                <option value="march">3-р сар</option>
                <option value="april">4-р сар</option>
                <option value="may">5-р сар</option>
                <option value="june">6-р сар</option>
                <option value="july">7-р сар</option>
                <option value="august">8-р сар</option>
                <option value="september">9-р сар</option>
                <option value="october">10-р сар</option>
                <option value="november">11-р сар</option>
                <option value="december">12-р сар</option>
                </select>
                
                <label for="duration">Үргэлжлэх Хугацаа: <span id="duration-value">15</span> хоног</label>
                <input type="range" id="duration" name="duration" min="1" max="30" value="15">
                
                <label for="location">Аялах Газар</label>
                <select id="location">
                <option value="">Аялах газраа сонгоно уу</option>
                <option value="Ulaanbaatar">Улаанбаатар</option>
                    <option value="Erdenet">Эрдэнэт</option>
                    <option value="Darkhan">Дархан</option>
                    <option value="Altai">Алтай</option>
                    <option value="Gobi">Говь</option>
                </select>

                <label for="type">Аяллын төрөл</label>
                <select id="type">
                <option value="">Аяллын төрлөө сонгоно уу</option>
                <option value="adventure">Адал явдалт</option>
                <option value="family">Гэр бүлийн</option>
                <option value="group">Групп аялал</option>
                    <option value="kids">Хүүхдийн аялал</option>
                </select>

                <label for="price">Үнэ: <span id="price-value">500000</span> ₮</label>
                <input type="range" id="price" name="price" min="50000" max="1000000" value="500000">
                
                <button class="search-button">ХАЙХ</button>
                </div>
                `;
            }
}

customElements.define('search-form', SearchForm);