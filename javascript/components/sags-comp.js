class SagsComp extends HTMLElement {
    constructor() {
        super();
        this.sags = {};
    }
  
    static get observedAttributes() {
        return ['data-sags'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'data-sags' && oldValue !== newValue) {
            this.aylal = JSON.parse(newValue);
            this.render();
        }
    }
  
    connectedCallback() {
        this.sags = JSON.parse(this.getAttribute('data-sags') || '{}');
        this.render();
    }
  
    render() {
        const { id, image, name, description, location, duration, price } = this.sags;
  
        this.innerHTML = `
        <style>
article{
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    background-color: var(--sectioncolor);
    display: flex;
    border-radius: 1rem;
}

.baraa a {
    display: flex;
    text-decoration: none;
    width: 100%;
}

.baraa img{
    height: 12rem;
    width: 30%;
    border-radius: 1rem;
}

.baraa .garchig {
    display: flex;
    flex-direction: column;
}

.baraa .itemTitle {
    font-size: 1.5rem;
    margin: 1rem 0;
    color: var(--fontcolor)
}

.baraa .medeelel {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
}

.baraa .itemDescription,
.baraa .itemLocation,
.baraa .itemDuration,
.baraa .itemPrice {
    font-size: 1rem;
    color: var(--fontcolor);
}

.baraa .doodheseg {
    display: flex;
    align-items: end;
}

.ustgahTovch{
    right: 0;
    border-color: var(--maincolor);
    color: var(--maincolor);
    background-color: transparent;
    padding: 1rem;
    border-radius: 1rem;
    margin: 1rem;
}

.ustgahTovch:hover{
    border-color: var(--maincolor);
    color: var(--darkfont);
    background-color: var(--maincolor);
}
    </style>
  
         <article class="baraa" data-id="${id}">
          <a href="aylal.html">
            <img src=${image} alt="Tour Image">
            <div class="garchig">
              <h2 class="itemTitle">${name}</h2>
              <p class="itemDescription">${description}</p>
              <div class="medeelel">
                <p class="itemLocation">📍 ${location}</p>
                <p class="itemDuration">⏳ ${duration} хоног</p>
                <p class="itemPrice">💰 ${price} ₮</p>
              </div>
            </div>
          </a>
          <span class="doodheseg">
            <button class="ustgahTovch" data-id="${id}">Устгах</button>
          </span>
        </article>
        `;
    }
  }
  
  customElements.define('sags-comp', SagsComp);