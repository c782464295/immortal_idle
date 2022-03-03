class MyClockElement extends HTMLElement{

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        
        this.render();
        
    }
    connectedCallback(){
        setInterval(() => this.render(), 1000);
    }

    render() {
        this.shadowRoot.innerHTML =`
                <div>
                    <style scoped>
                    :host {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);

                    display: inline-block;
                    padding: .5em 1em;

                    background-color: #5180e9;
                    color: #fff;

                    font-size: 2.3em;
                    font-weight: bold;
                    font-family: Helvetica, "Arial", sans-serif;
                    }
                    </style>
                        ${new Date().toLocaleTimeString()}
                </div>
        `;
    }

}
customElements.define('time-clock', MyClockElement);