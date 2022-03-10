class TreeCard extends HTMLElement{
    constructor(id, val){
        super();
        this.id = id;
        this._checked = undefined;
        document.getElementById(this.id).appendChild(this);
        const shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
        .card{
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 200px;
            display:inline-block;
            margin:20px;
            text-align:center;

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

        .card[aria-checked="true"] {
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }
        </style>

        <div class='card' id=${val.id} aria-checked="false">
            <p>经验:5xp</p>
            <img src="./assets/${val.svg}.svg" alt="Avatar" height="100px" width="100px">
            <div class="container">
                <progress max=100 value=10></progress>
                <h4><b>John Doe</b></h4> 
                <p>Architect & Engineer</p>
            </div>
        </div>
        `
        this.shadowRoot.querySelector('.card').addEventListener('click', this.check.bind(this), false);
    }

    connectedCallback(){
        
    }


    check(event){
        let children = document.getElementById(this.id).childNodes;
        for (let e in children){

            if(children[e].isChecked == true && children[e]!=this){
                return
            }
        }

        console.log(event.target.closest(".card").id);
        const isPressed = event.currentTarget.getAttribute('aria-checked') === 'true';
        event.currentTarget.setAttribute('aria-checked', String(!isPressed));
        this._checked = Boolean(!isPressed);

        let myEvent = new CustomEvent('get_ore', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail:{
                num:1// 将需要传递的数据写在detail中，以便在EventListener中获取
                // 数据将会在event.detail中得到
            },
        });
        this.dispatchEvent(myEvent);
    }

    get isChecked(){
        return  this._checked;
    }

}


customElements.define('tree-element', TreeCard);

/* let card = new Card('123')
*  card.data = {png:'img_avatar',id:'2'}
*/



/**
 * //假设listener注册在window对象上
window.addEventListener('get_ore', function(event){
    // 如果是CustomEvent，传入的数据在event.detail中
    console.log('得到数据为：', event.detail);
    // ...后续相关操作
});

 */