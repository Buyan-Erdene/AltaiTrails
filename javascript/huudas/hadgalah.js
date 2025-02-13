import { fetchAylalData } from "../modules/fetchaylal.js";
import { renderAylal } from "../modules/renderAylluud.js";
import { transformAylalData } from "../modules/transformAylal.js";

async function loadCartItems() {
    // Аяллын мэдээллийг серверээс авах
    const data = await fetchAylalData();
    const transformedData = Array.isArray(data) ? data.map(transformAylalData) : (data.aylluud || []).map(transformAylalData);

    // cartManager-аас сагсанд байгаа барааны ID-уудыг авах
    const cartItemIds = cartManager.cart; // cartManager.cart нь сагсанд байгаа барааны ID-уудыг агуулна

    // transformedData-аас сагсанд байгаа бараануудыг шүүж авах
    const cartItems = transformedData.filter(item => cartItemIds.includes(String(item.id)));

    // Сагсанд байгаа бараануудыг харуулах
    const container = document.getElementById("cart-items");
    container.innerHTML = ""; // Өмнөх элементүүдийг цэвэрлэх
    renderAylal(container, cartItems);

    updateTotalPrice(cartItems);
}

function updateTotalPrice(items) {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("total-price").textContent = totalPrice;
}

// cartManager-д төлөвийн өөрчлөлтийг бүртгэх
cartManager.subscribe(loadCartItems);

document.getElementById("delete-all").addEventListener("click", () => {
    cartManager.cart = []; // Сагсыг хоослох
    cartManager.saveToLocalStorage(); // LocalStorage-д хадгалах
    cartManager.notifySubscribers(); // Төлөвийн өөрчлөлтийг мэдээлэх
});

document.addEventListener("DOMContentLoaded", loadCartItems);