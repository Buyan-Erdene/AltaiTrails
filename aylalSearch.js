import Aylluud from "./aylluudUusgeh.js";
import { loadData as loadSags } from "./aylluudUusgeh.js";

// Load data and log it
const sagsData = await loadSags();
console.log("Loaded sagsData:", sagsData); // Check if sagsData is correctly loaded

const sagsHTML = (new Aylluud({ record: sagsData })).render();

document
    .getElementById("aylluud")  //aylluud ID tai hesgiig olood sagsHTML iin obyektuudiig hiij bn
    .insertAdjacentHTML("beforeEnd", sagsHTML);

// Function to render the filtered tours
const renderTours = (filteredData) => {
    const aylluudElement = document.getElementById("aylluud");

    if (!aylluudElement) {
        console.error("The 'aylluud' element is missing from the page.");
        return;
    }

    const sagsHTML = new Aylluud({ record: filteredData }).render();
    aylluudElement.innerHTML = sagsHTML;
};

// Filter function for all criteria
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

    // Update URL parameter
    const url = new URL(window.location);
    if (selectedMonth) url.searchParams.set("month", selectedMonth);
    if (selectedLocation) url.searchParams.set("location", selectedLocation);
    if (selectedType) url.searchParams.set("type", selectedType);
    if (selectedPrice) url.searchParams.set("price", selectedPrice);
    window.history.replaceState({}, "", url);
};

// Attach event listeners for the dropdowns and range input
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

// Load filter from URL on page load
window.addEventListener("load", () => {
    // Log the URL parameters
    const params = new URLSearchParams(window.location.search);
    const monthParam = params.get("month");
    const locationParam = params.get("location");
    const typeParam = params.get("type");
    const priceParam = params.get("price");

    // Set the initial values of the filter inputs based on URL params
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

    // Log parameters
    console.log("Loaded filter params:", monthParam, locationParam, typeParam, priceParam);

    // Render data on page load without filters applied
    if (sagsData && sagsData.length > 0) {
        renderTours(sagsData);
    } else {
        console.error("No data available to render.");
    }
});
