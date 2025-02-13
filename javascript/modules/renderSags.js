export function renderSags(container, filteredAylal) {
    container.innerHTML = "";

    if (filteredAylal.length === 0) {
        const hooson = `<p style="padding : 10px 20px;">Хадгалсан аялал байхгүй байна.</p>`;
        container.insertAdjacentHTML("beforeend", hooson);
        return;
    }

    filteredAylal.forEach((b) => {
        const sags = document.createElement('sags-comp');
        sags.setAttribute('data-sags', JSON.stringify(b));
        container.appendChild(sags);
    });
}

