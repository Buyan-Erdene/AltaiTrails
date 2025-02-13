import { fetchAylalData } from "../modules/fetchaylal.js";
import { renderAylal } from "../modules/renderAylluud.js";
import { transformAylalData } from "../modules/transformAylal.js";

async function loadCartItems() {
    const data = await fetchAylalData();
    const transformedData = Array.isArray(data) ? data.map(transformAylalData) : (data.aylluud || []).map(transformAylalData);

    const cartItemIds = cartManager.cart;
    const cartItems = transformedData.filter(item => cartItemIds.includes(String(item.id)));
    const container = document.getElementById("cart-items");
    container.innerHTML = ""; 
    renderAylal(container, cartItems);
    updateTotalCart(cartItems);
}

function updateTotalCart(items) {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    const totalCount = items.length;
    const totalPriceElement = document.querySelector('total-price-comp');
    if (totalPriceElement) {
        totalPriceElement.updateTotalPrice(totalPrice);
        totalPriceElement.updateTotalCount(totalCount);
    }
}



cartManager.subscribe(loadCartItems);
document.getElementById("delete-all").addEventListener("click", () => {
    cartManager.cart = [];
    cartManager.saveToLocalStorage();
    cartManager.notifySubscribers();
});

document.addEventListener("DOMContentLoaded", loadCartItems);