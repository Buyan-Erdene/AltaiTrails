import Aylal from "aylal.js";

export default class Aylluud {
    constructor(sagsData) {
        this.id = sagsData.id;
        this.baraa = sagsData.record;
    }

    render() {
        return `
            <div id="aylluud">
                ${this.RenderProducts()}
            </div>
        `;
    }

    RenderProducts() {
        if (!this.baraa || this.baraa.length === 0) {
            return `<p>Сагсанд бараа байхгүй байна.</p>`;
        }
        return this.baraa
            .map(b => new Aylal(b).render())
            .join("");
    }
}




export async function loadData(){
    const result = await fetch("https://api.jsonbin.io/v3/b/677de2a5acd3cb34a8c5cc15");
    const data = await result.json();
    return data.record;
}