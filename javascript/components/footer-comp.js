class FooterComp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <footer>
    <div class="footerheseg">
        <div class="footer-section">
            <div class="footer-header">
                <h3 class="footergarchig">Joinme.mn</h3>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="footer-content">
                <ul>
                    <li><a href="#">Бидний тухай</a></li>
                    <li><a href="#">Үйлчилгээний нөхцөл</a></li>
                    <li><a href="#">Нууцлалын бодлого</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-section">
            <div class="footer-header">
                <h3 class="footergarchig">Тусламж</h3>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="footer-content">
                <ul>
                    <li><a href="#">Аялал хэрхэн захиалах вэ?</a></li>
                    <li><a href="#">Аялалын төлбөрийн боломжууд</a></li>
                    <li><a href="#">Байгууллага хамт олны аялал</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-section">
            <div class="footer-header">
                <h3 class="footergarchig">Миний булан</h3>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="footer-content">
                <ul>
                    <li><a href="#">Улаанбаатар</a></li>
                    <li><a href="#">Холбоо барих</a></li>
                    <li><a href="#">Instagram: @Altaitrails_</a></li>
                    <li><a href="#">Facebook: Altaitrails</a></li>
                    <li><a href="#">Утас: 9999999</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="copyright">
        © 2025. БҮХ ЭРХ ХУУЛИАР ХАМГААЛАГДСАН
    </div>
</footer>
        `;
    }
}

customElements.define('footer-comp', FooterComp);