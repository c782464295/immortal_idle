class Card extends HTMLElement{
    constructor(id){
        super();
        this.id = id;
        document.getElementById('ooo').appendChild(this);
    }

    connectedCallback(){
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<style>
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
        </style>
        
        `;

        

        
     
    
        this.shadowRoot.addEventListener('click', this.check.bind(this), false);

        
    }


    check(e){
        console.log(e.target.closest(".card").id);
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
        </style>

        <div class='card' id=` + this.id + `>
            <img src="./assets/`+ val.png +`.png" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>John Doe</b></h4> 
                <p>Architect & Engineer</p> 
            </div>
        </div>
        `
    }

}


customElements.define('card-element', Card);

/* let card = new Card('123')
*  card.data = {png:'img_avatar',id:'2'}
*/