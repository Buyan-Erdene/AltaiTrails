class AylalComp extends HTMLElement {
  constructor() {
      super();
      this.aylal = {};
  }

  static get observedAttributes() {
      return ['data-aylal'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'data-aylal' && oldValue !== newValue) {
          this.aylal = JSON.parse(newValue);
          this.render();
      }
  }

  connectedCallback() {
      this.aylal = JSON.parse(this.getAttribute('data-aylal') || '{}');
      this.render();
      this.addEventListener('aylal-hadgalah', this.handleAylalHadgalah.bind(this));
  }

  disconnectedCallback() {
      this.removeEventListener('aylal-hadgalah', this.handleAylalHadgalah);
  }

  handleAylalHadgalah(event) {
      const { aylalId, hadgalsan } = event.detail;
      console.log("budaarai", event.detail);
  }

  render() {
      const { id, image, name, description, location, duration, price } = this.aylal;

      this.innerHTML = `
      <style> 
          .aylal {
              background-color: rgb(250, 250, 250);
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .aylal:hover {
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
          }
          
          .aylal img {
              height: 15rem;
              width: 100%;
              object-fit: cover;
          }
          
          .aylal a {
              text-decoration: none;
              color: var(--fontcolor);
              display: block;
          }
          
          .aylal a h2,
          .aylal a p {
              padding-left: 1rem;
              margin: 0.5rem 0;
          }
          
          .aylal a h2 {
              font-size: 1.5rem;
              font-weight: bold;
          }
          
          .doodheseg {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: 1rem;
              padding: 0.5rem 1rem;
          }
          
          article button {
              border: 2px solid #FD9545;
              color: #FD9545;
              background-color: transparent;
              padding: 0.75rem 1.5rem;
              border-radius: 3rem;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.3s ease, color 0.3s ease;
          }
          
          article button:hover {
              background-color: #FD9545;
              color: var(--darkfont);
          }
          
          .iconheart {
              font-size: 1.5rem;
              transition: transform 0.3s ease, color 0.3s ease;
              display: inline-block;
              color: #FD9545;
          }
          
          .addHadgalsan:hover .iconheart {
              transform: scale(1.5);
          }
          
          .aylal .itemTitle {
              font-size: 1.25rem;
          }
          
          .aylal .itemLocation,
          .aylal .itemDuration,
          .aylal .itemPrice {
              font-size: 1rem;
          }
      </style>

      <article class="aylal" data-id="${id}">
          <a href="aylal.html?id=${id}">
              <img src="${image}" alt="Tour Image">
              <h2 class="itemTitle">${name}</h2>
              <p class="itemDescription">${description}</p>
              <p class="itemLocation">📍 ${location}</p>
              <p class="itemDuration">⏳ ${duration} хоног</p>
              <p class="itemPrice">💰 ${price} ₮</p>
          </a>
          <span class="doodheseg">
              <add-hadgalah did="${id}"></add-hadgalah>
              <a href="sags.html"><button class="addSags"></a>
                  Захиалах
              </button>
          </span>
      </article>  
      `;
  }
}

customElements.define('aylal-comp', AylalComp);