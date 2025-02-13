class HeaderComp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <header class="header">
        <div class="header-left">
            <a href="index.html"><img src="logo.png" class="logo" alt="logo">
                <span class="logoname">AltaiTrails.mn</span></a>
        </div>
        <nav class="header-right">
            <ul class="menu">
                <li>
                    <input type="text" placeholder="Хайх.." class="search">
                </li>
                <li><a href="search.html">Аялал</a></li>
                <li><a href="public/html/Blog.html" class="blog">Блог</a></li>
                <li><a href="hadgalsan.html" class="hadgalsan">
                        <i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                class="svg">
                                <path
                                    d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z">
                                </path>
                            </svg></i>
                        <span>
                            Хадгалсан
                        </span>
                    </a></li>
                <li>
                    <a href="login.html" class="login">
                        <i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                class="svg">
                                <path
                                    d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z">
                                </path>
                            </svg></i>
                        <span>
                            Нэвтрэх
                        </span>
                    </a>
                </li>
                <li>
                    <button id="dark-mode" class="dark-mode-btn">
                        <span class="icon sun">☀️</span>
                        <span class="icon moon" style="display: none;">🌙</span>
                    </button>
                </li>
            </ul>
        </nav>
    </header>
        `;
    }

}

customElements.define('header-comp', HeaderComp);