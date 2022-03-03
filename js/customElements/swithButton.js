class SwitchButton extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const className = this.dataset.className;
        this.classList.add(className);
        const buttonTemplate = document.createElement('template');
        buttonTemplate.innerHTML = `
        <span class="${className}__label" id="${labelId}-label">
            ${labelText}
        </span>
        <button
            type="button"
            role="switch"
            class="button
            ${className}__control"
            ${ariaChecked}
            aria-labelledby="${labelId}-label"
        >
            <span class="state state--true">on</span>
            <span class="state state--false">off</span>
        </button>
        `;
    this.innerHTML = '';
    this.appendChild(buttonTemplate.content.cloneNode(true));
    }

}


customElements.define('switch-button', SwitchButton);