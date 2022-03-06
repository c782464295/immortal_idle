class SwitchButton extends HTMLElement{
    constructor(){
        super();
        this._checked = undefined;
    }

    connectedCallback(){
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>
        button::-moz-focus-inner {
          border-style: none;
          padding: 0;
        }
      
        .switch-btn {
          background: none;
          border: 0;
          color: inherit;
          font: inherit;
          line-height: 1;
          padding: .75em 3.75em .75em .5em;
          position: relative;
          text-align: left;
          width: 100%;
        }
      
        .switch-btn span {
          pointer-events: none;
        }
      
        .switch-btn__knob {
          background: #fff;
          border-radius: 1em;
          border: 1px solid #2a2a2a;
          bottom: .5em;
          box-shadow: inset -1.625em 0 0 1px rgba(120, 120, 120, 1);
          height: 1.5em;
          margin: auto;
          position: absolute;
          right: 0;
          top: .5em;
          transition:
            border .2s ease-in-out,
            box-shadow .2s ease-in-out;
          width: 3em;
        }
      
        .switch-btn[aria-checked="true"] .switch-btn__knob {
          border: 1px solid rgba(0, 2, 120, 1);
          box-shadow: inset 1.625em 0 0 1px #2196f3;
        }
      
        .switch-btn[disabled] {
          opacity: .525;
        }
      
        .switch-btn__knob:before {
          border: 2px solid;
          border-color: rgba(33, 150, 243, 0);
          border-radius: 1em;
          bottom: 0;
          content: "";
          left: 0em;
          position: absolute;
          right: 0em;
          top: 0em;
          transition:
            border-color .2s ease-in-out,
            bottom .2s ease-in-out,
            left .2s ease-in-out,
            right .2s ease-in-out,
            top .2s ease-in-out;
        }
      
        .switch-btn:focus .switch-btn__knob:before {
          border-color: rgba(33, 150, 243, 1);
          bottom: -.325em;
          left: -.325em;
          right: -.325em;
          top: -.325em;
        }
      
        .switch-btn--show-labels {
          padding-right: 4.5em;
        }
      
        .switch-btn--show-labels .switch-btn__knob {
          box-shadow: inset -2.05em 0 0 1px rgba(120, 120, 120, 1);
          width: 3.5em;
        }
      
        .switch-btn--show-labels[aria-checked="true"] .switch-btn__knob {
          box-shadow: inset 2.05em 0 0 1px #2196f3;
        }
      
        .switch-btn--show-labels .switch-btn__knob:after {
          color: #fff;
          content: "Off";
          display: block;
          font-size: .825em;
          line-height: 1.825;
          padding: 0 .5em;
          text-align: right;
        }
      
        .switch-btn--show-labels[aria-checked="true"] .switch-btn__knob:after {
          content: "On";
          text-align: left;
        }
      
        @media ( prefers-reduced-motion: reduce ) {
          .switch-btn__knob:before,
          .switch-btn__knob {
            transition: none;
          }
        }
      
        @media screen and ( -ms-high-contrast: active ) {
          .switch-btn__knob:after {
            background-color: windowText;
          }
        }
        </style>
        <button type="button" class="switch-btn switch-btn--show-labels" aria-checked="true" role="switch">
        <!-- role presentation is needed to ensure NVDA won't have redundant announcements -->
        <span class="switch-btn__text" role="presentation">Enable Settings</span>
        <span class="switch-btn__knob" aria-hidden="true"></span>
        <!-- hide the knob, especially since it can have "on" and "off" CSS content that 
            we don't want announced -->
        </button>
        `;
        this._checked = Boolean(this.shadowRoot.querySelector('button').getAttribute('aria-checked'));
        


        this.shadowRoot.querySelector('.switch-btn__text').innerHTML = this.getAttribute('text');
    
        this.shadowRoot.querySelector('button').addEventListener('click', this.check.bind(this));

        
    }

    check(event){
      
        const isPressed = event.currentTarget.getAttribute('aria-checked') === 'true';
        event.currentTarget.setAttribute('aria-checked', String(!isPressed));
        this._checked = Boolean(!isPressed);
       
    }

    emit(data){
      return data;
    }

    get isChecked(){
        return  this._checked;
    }
}


customElements.define('switch-button', SwitchButton);

/* document.querySelector('switch-button').isChecked
*/