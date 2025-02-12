import Aylluud from "aylalUusgeh.js";
import { loadData as loadSags } from "aylalUusgeh.js";

const sagsData = await loadSags();
console.log("Data:", sagsData);

const sagsHTML = (new Aylluud({ record: sagsData })).render();  //sagsdata ashiglan object uusgeh

document
    .getElementById("aylluud")  //aylluud elementiig avna
    .insertAdjacentHTML("beforeEnd", sagsHTML);  //baigaa item iin ard html iig nemne

const renderAylal = (filteredData) => {   //shuugdsen ogogdliig html eer haruulah
    const aylluudElement = document.getElementById("aylluud");   //
    const sagsHTML = new Aylluud({ record: filteredData }).render();  //filtered data Aylluud class iin object bolno. renderlene
    aylluudElement.innerHTML = sagsHTML; //odoogiin html iin orond shine html iig haruulna
};

const filterAylal = () => {  //shuult hiih utguudiig avna
    const Sar = document.getElementById("travel-month").value;
    const hugatsaa = document.getElementById("duration").value;
    const bairshil = document.getElementById("location").value;
    const torol = document.getElementById("type").value;
    const une = document.getElementById("price").value;

    const filteredData = sagsData.filter(tour => {  //nohtsoluud tohirch bga esehiig shalgana
        const sarTaarah = Sar ? tour.month === Sar : true;
        const hugatsaaTaarah = tour.duration <= hugatsaa;
        const bairshilTaarah = bairshil ? tour.location === bairshil : true;
        const torolTaatah = torol ? tour.type === torol : true;
        const uneTaarah = tour.price <= une;

        return sarTaarah && hugatsaaTaarah && bairshilTaarah && torolTaatah && uneTaarah;
    });

    renderAylal(filteredData);  //shuugdsen aylluudiig renderlej haruulna

    const url = new URL(window.location);  //odoogiin url iig avna
    if (Sar) url.searchParams.set("month", Sar);  //url shuultiin utguudiig nemne
    if (bairshil) url.searchParams.set("location", bairshil);
    if (torol) url.searchParams.set("type", torol);
    if (une) url.searchParams.set("price", une);
    window.history.replaceState({}, "", url);
};

document.getElementById("travel-month").addEventListener("change", filterAylal);  //eventlistener uug nemne
document.getElementById("duration").addEventListener("input", function () {
    document.getElementById("duration-value").textContent = this.value;
    filterAylal();
});
document.getElementById("location").addEventListener("change", filterAylal);
document.getElementById("type").addEventListener("change", filterAylal);
document.getElementById("price").addEventListener("input", function () {
    document.getElementById("price-value").textContent = this.value;
    filterAylal();
});

window.addEventListener("load", () => {  //huudas achaalahad
    const params = new URLSearchParams(window.location.search);  //url aas shuultiin utguudiig avna
    const sarParam = params.get("month");
    const bairshilParam = params.get("location");
    const torolParam = params.get("type");
    const uneParam = params.get("price");

    if (sarParam) {   // url iin utguudiig haih hesguuded tohiruulna
        document.getElementById("travel-month").value = sarParam;
    }
    if (bairshilParam) {
        document.getElementById("location").value = bairshilParam;
    }
    if (torolParam) {
        document.getElementById("type").value = torolParam;
    }
    if (uneParam) {
        document.getElementById("price").value = uneParam;
    }

    if (sagsData && sagsData.length > 0) {  //aylluud bval renderlej haruulna
        renderAylal(sagsData);
    } else {
        console.error("Аялал байхгүй.");
    }
});
