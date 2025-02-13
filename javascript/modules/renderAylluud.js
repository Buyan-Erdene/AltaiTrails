export function renderAylal(container, filteredAylal) {
    container.innerHTML = "";

    if (filteredAylal.length === 0) {
        const hooson = `<p style="padding : 10px 20px;">Аялал байхгүй байна.</p>`;
        container.insertAdjacentHTML("beforeend", hooson);
        return;
    }

    filteredAylal.forEach((b) => {
        const aylal = document.createElement('aylal-comp');
        aylal.setAttribute('data-aylal', JSON.stringify(b));
        container.appendChild(aylal);
    });
}

