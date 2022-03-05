class Card extends HTMLElement{
    constructor(id, val){
        super();
        this.id = id;
        this._checked = undefined;
        document.getElementById('oco').appendChild(this);
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <style>
        .card{
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 200px;
            display:inline-block;
            margin:20px;
        }
          
        .card:hover{
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }
          
        .container{
            padding: 2px 16px;
        }

        progress{
            opacity: 0;
        }

        .card[aria-checked="true"] progress{
            opacity: 1;
        }
        </style>

        <div class='card' id=` + this.id + ` aria-checked="false">
            <img src="./assets/`+ val.png +`.png" alt="Avatar" style="width:100%">
            <div class="container">
                <progress></progress>
                <h4><b>John Doe</b></h4> 
                <p>Architect & Engineer</p> 
            </div>
        </div>
        `
        shadowRoot.querySelector('.card').addEventListener('click', this.check.bind(this), false);
    }

    connectedCallback(){
        
    }


    check(event){
        let children = document.getElementById('oco').childNodes;
        for (let e in children){

            if(children[e].isChecked == true && children[e]!=this){
                return
            }
        }
        
        console.log(event.target.closest(".card").id);
        const isPressed = event.currentTarget.getAttribute('aria-checked') === 'true';
        event.currentTarget.setAttribute('aria-checked', String(!isPressed));
        this._checked = Boolean(!isPressed);
    }

    set data(val){
        this.shadowRoot.innerHTML = `
        <style>
        .card{
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 200px;
            display:inline-block;
            margin:20px;
        }
          
        .card:hover{
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }
          
        .container{
            padding: 2px 16px;
        }

        .container progress{
            visibility: hidden;
        }
        </style>

        <div class='card' id=` + this.id + ` aria-checked="false">
            <img src="./assets/`+ val.png +`.png" alt="Avatar" style="width:100%">
            <div class="container">
                <progress></progress>
                <h4><b>John Doe</b></h4> 
                <p>Architect & Engineer</p> 
            </div>
        </div>
        `
        
    }
    get isChecked(){
        return  this._checked;
    }

}


customElements.define('card-element', Card);

/* let card = new Card('123')
*  card.data = {png:'img_avatar',id:'2'}
*/