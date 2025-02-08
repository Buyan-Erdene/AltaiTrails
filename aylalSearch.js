import Aylluud from "./aylalUusgeh.js";
import { loadData as loadSags } from "./aylalUusgeh.js";

const sagsData = await loadSags();
console.log("Loaded sagsData:", sagsData);

const sagsHTML = (new Aylluud({ record: sagsData })).render();

document
    .getElementById("aylluud")  
    .insertAdjacentHTML("beforeEnd", sagsHTML);

const renderTours = (filteredData) => {
    const aylluudElement = document.getElementById("aylluud");

    if (!aylluudElement) {
        console.error("The 'aylluud' element is missing from the page.");
        return;
    }

    const sagsHTML = new Aylluud({ record: filteredData }).render();
    aylluudElement.innerHTML = sagsHTML;
};

const filterTours = () => {
    const selectedMonth = document.getElementById("travel-month").value;
    const selectedDuration = document.getElementById("duration").value;
    const selectedLocation = document.getElementById("location").value;
    const selectedType = document.getElementById("type").value;
    const selectedPrice = document.getElementById("price").value;

    const filteredData = sagsData.filter(tour => {
        const matchesMonth = selectedMonth ? tour.month === selectedMonth : true;
        const matchesDuration = tour.duration <= selectedDuration;
        const matchesLocation = selectedLocation ? tour.location === selectedLocation : true;
        const matchesType = selectedType ? tour.type === selectedType : true;
        const matchesPrice = tour.price <= selectedPrice;

        return matchesMonth && matchesDuration && matchesLocation && matchesType && matchesPrice;
    });

    renderTours(filteredData);

    const url = new URL(window.location);
    if (selectedMonth) url.searchParams.set("month", selectedMonth);
    if (selectedLocation) url.searchParams.set("location", selectedLocation);
    if (selectedType) url.searchParams.set("type", selectedType);
    if (selectedPrice) url.searchParams.set("price", selectedPrice);
    window.history.replaceState({}, "", url);
};

document.getElementById("travel-month").addEventListener("change", filterTours);
document.getElementById("duration").addEventListener("input", function() {
    document.getElementById("duration-value").textContent = this.value;
    filterTours();
});
document.getElementById("location").addEventListener("change", filterTours);
document.getElementById("type").addEventListener("change", filterTours);
document.getElementById("price").addEventListener("input", function() {
    document.getElementById("price-value").textContent = this.value;
    filterTours();
});

window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const monthParam = params.get("month");
    const locationParam = params.get("location");
    const typeParam = params.get("type");
    const priceParam = params.get("price");

    if (monthParam) {
        document.getElementById("travel-month").value = monthParam;
    }
    if (locationParam) {
        document.getElementById("location").value = locationParam;
    }
    if (typeParam) {
        document.getElementById("type").value = typeParam;
    }
    if (priceParam) {
        document.getElementById("price").value = priceParam;
    }

    console.log("Loaded filter params:", monthParam, locationParam, typeParam, priceParam);

    if (sagsData && sagsData.length > 0) {
        renderTours(sagsData);
    } else {
        console.error("No data available to render.");
    }
});
