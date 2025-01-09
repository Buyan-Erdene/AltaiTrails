export default class Aylal {
    constructor(aylalObj) {
        this.id = aylalObj.id;
        this.ner = aylalObj.title;
        this.sar = aylalObj.month;
        this.bairshil = aylalObj.location;
        this.torol = aylalObj.type;
        this.une = aylalObj.price;
        this.hugatsaa = aylalObj.duration;
        this.zurag = aylalObj.image;
        this.delgerengui = aylalObj.description;
    }

    render() {
        return `
        <article class="aylal">
          <a href="aylal.html">
            <img src=${this.zurag} alt="Tour Image">
            <h2 class="itemTitle">${this.ner}</h2>
            <p class="itemDescription">${this.delgerengui}</p>
            <p class="itemLocation">📍 ${this.bairshil}</p>
            <p class="itemDuration">⏳ ${this.hugatsaa} хоног</p>
            <p class="itemPrice">💰 ${this.une.toLocaleString()} ₮</p>
          </a>
          <span class="doodheseg">
            <button class="addHadgalsan">
              <span class="iconheart">🧡</span>
            </button>
            <button class="addSags">
              Захиалах
            </button>
          </span>
        </article>
      `
//   <button onclick="app.removeFx${this.id}">remove</button>
    }
}