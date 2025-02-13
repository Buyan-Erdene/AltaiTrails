// index.js
import { fetchAylalData } from "../modules/fetchaylal.js";
import { renderAylal } from "../modules/renderAylluud.js";
import { transformAylalData } from "../modules/transformAylal.js";

let sagsData = [];

async function indexAylluud() {
    try {
        const data = await fetchAylalData();
        console.log("Fetched Data:", data);
        sagsData = Array.isArray(data) ? data.map(transformAylalData) : (data.aylluud || []).map(transformAylalData);
        console.log("Transformed Data:", sagsData);
        
        const container = document.getElementById("aylluud");
        if (!container) {
            console.error("'aylluud' ID-тай элемент олдсонгүй!");
            return;
        }
        renderAylal(container, sagsData);
    } catch (error) {
        console.error("Өгөгдөл дуудахад алдаа гарлаа:", error);
    }
}

// Шүүлтүүр функц
const filterAylal = (searchParams) => {
    const filteredData = sagsData.filter(tour => {
        const sarTaarah = searchParams.month ? tour.month === searchParams.month : true;
        const hugatsaaTaarah = searchParams.duration ? tour.duration <= parseInt(searchParams.duration) : true;
        const bairshilTaarah = searchParams.location ? tour.location === searchParams.location : true;
        const torolTaatah = searchParams.type ? tour.type === searchParams.type : true;
        const uneTaarah = searchParams.price ? tour.price <= parseInt(searchParams.price) : true;

        return sarTaarah && hugatsaaTaarah && bairshilTaarah && torolTaatah && uneTaarah;
    });

    const container = document.getElementById("aylluud");
    renderAylal(container, filteredData);

    // URL параметрүүдийг шинэчлэх
    const url = new URL(window.location);
    Object.entries(searchParams).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value);
        } else {
            url.searchParams.delete(key);
        }
    });
    window.history.replaceState({}, "", url);
};

// URL параметрүүдийг search-form руу оруулах
function setInitialSearchParams() {
    const searchForm = document.querySelector('search-form');
    if (!searchForm) return;

    const params = new URLSearchParams(window.location.search);
    const searchParams = {
        month: params.get("month") || "",
        location: params.get("location") || "",
        type: params.get("type") || "",
        duration: params.get("duration") || "15",
        price: params.get("price") || "500000"
    };

    // Custom event ашиглан search-form руу параметрүүдийг дамжуулах
    searchForm.dispatchEvent(
        new CustomEvent('setParams', { detail: searchParams })
    );
}

// Хуудас ачаалагдахад
document.addEventListener("DOMContentLoaded", async () => {
    await indexAylluud();
    setInitialSearchParams();

    // search-form-оос ирэх хайлтын үйлдлийг сонсох
    const searchForm = document.querySelector('search-form');
    if (searchForm) {
        searchForm.addEventListener('search', (event) => {
            filterAylal(event.detail);
        });
    }
});