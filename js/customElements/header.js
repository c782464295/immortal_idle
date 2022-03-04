class Header extends HTMLElement{
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <style>
            @import url("https://unpkg.com/@tabler/core@latest/dist/css/tabler.min.css");
            @import url("https://unpkg.com/@tabler/core@1.0.0-beta6/dist/css/tabler-flags.min.css");
            @import url("https://unpkg.com/@tabler/core@1.0.0-beta6/dist/css/tabler-payments.min.css");
            @import url("https://unpkg.com/@tabler/core@1.0.0-beta6/dist/css/tabler-vendors.min.css");
        </style>
        
        <header class="navbar navbar-expand-md d-print-none">
        <div class="container">
            <!-- 缩进栏 -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-expanded="True">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- logo -->
            <h1 class="navbar-brand d-none-navbar-horizontal pe-0 pe-md-3">
                <a href=".">
                  <img src="./logo_v6.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image">
                </a>
            </h1>


            <!-- 登录状态栏 -->
            <div class="navbar-nav order-md-last">
                <div class="nav-item dropdown ">
                    <a href="#" class="nav-link dropdown-toggle d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                        <span class="avatar avatar-sm" style="background-image: url(./combat.svg)"></span>
                        <div class="d-none d-xl-block ps-2 ">
                            <div>Kard-</div>
                            <div class="mt-1 small text-muted">元婴期</span></div>
                        </div>
                    </a>
                    
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <a href="#" class="dropdown-item">Set status</a>
                        <a href="#" class="dropdown-item">Profile & account</a>
                        <a href="#" class="dropdown-item">Feedback</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">Settings</a>
                        <a href="#" class="dropdown-item">Logout</a>
                    </div>
                </div> 
            </div>

        </div>
        
    </header>
      `;
    }

    connectedCallback(){
        
    }

    attributeChangeCallback(){

    }

    disconnectedCallback(){

    }

    adoptedCallback(){

    }

    static get observedAttributes(){
        return [/* array of attribute names to monitor for changes */];
    }
}

customElements.define("header-element", Header);