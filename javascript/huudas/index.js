import { fetchAylalData } from "../modules/fetchaylal.js";
import { renderAylal } from "../modules/renderAylluud.js";
import { transformAylalData } from "../modules/transformAylal.js";


async function indexAylluud() {
    const data = await fetchAylalData();
    const transformedData = Array.isArray(data) ? data.map(transformAylalData) : (data.aylluud || []).map(transformAylalData);

    const container = document.getElementById("aylluud");
    renderAylal(container, transformedData.slice(0, 6)); 
}

document.addEventListener("DOMContentLoaded", indexAylluud);