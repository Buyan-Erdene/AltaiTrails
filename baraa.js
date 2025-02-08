export default class Baraa {
    constructor(baraaObj) {
        this.id = baraaObj.id;
        this.ner = baraaObj.title;
        this.sar = baraaObj.month;
        this.bairshil = baraaObj.location;
        this.torol = baraaObj.type;
        this.une = baraaObj.price;
        this.hugatsaa = baraaObj.duration;
        this.zurag = baraaObj.image;
        this.delgerengui = baraaObj.description;
    }

    render() {
      return `
        <article class="baraa" data-id="${this.id}">
          <a href="aylal.html">
            <img src=${this.zurag} alt="Tour Image">
            <div class="garchig">
              <h2 class="itemTitle">${this.ner}</h2>
              <p class="itemDescription">${this.delgerengui}</p>
              <div class="medeelel">
                <p class="itemLocation">📍 ${this.bairshil}</p>
                <p class="itemDuration">⏳ ${this.hugatsaa} хоног</p>
                <p class="itemPrice">💰 ${this.une.toLocaleString()} ₮</p>
              </div>
            </div>
          </a>
          <span class="doodheseg">
            <button class="ustgahTovch" data-id="${this.id}">Устгах</button>
          </span>
        </article>
      `;
    }
}