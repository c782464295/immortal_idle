class TreeCard extends HTMLElement{
    constructor(id, val){
        super();
        this.id = id;
        this.data = val;
        this._checked = undefined;
        document.getElementById(this.id).appendChild(this);
        this.timer = null;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <style>
        .card{
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 400px;
            height: 300px;
            display:inline-block;
            margin:20px;
            text-align:center;
            -webkit-user-select: none; 
            cursor: pointer;
        }
          
        .card:hover{
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }
          
        .container{
            padding: 2px 16px;
        }

        progress{
            opacity: 0;
            width: 300px;
            height: 20px;
            background: #1da1f2;
            box-shadow: 2px 14px 15px -7px rgba(30, 166, 250, 0.36);
            border-radius: 50px;
            transition: all 0.5s;
        }
        .card[aria-checked="true"] progress{
            opacity: 1;
        }

        .card[aria-checked="true"] {
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }
        </style>

        <div class='card' id=${val.id} aria-checked="false">
    <p>经验:${val.baseExperience*1000/val.baseInterval}xp/s</p>
            <img src=${val.media} alt="Avatar" height="100px" width="100px">
            <div class="container">
                <progress max=100 value=10></progress>
                <p><b>${val.name}</b></p>
                <p>${val.description}</p>
            </div>
        </div>
        `
        this.bar = shadowRoot.querySelector('progress');
        shadowRoot.querySelector('.card').addEventListener('click', this.check.bind(this), false);

        
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

        if(this.timer == null){
            this.timer = setInterval(()=>this.action(),20);
        }else{
            clearInterval(this.timer);
            this.timer = null;
        }

        
        const isPressed = event.currentTarget.getAttribute('aria-checked') === 'true';
        event.currentTarget.setAttribute('aria-checked', String(!isPressed));
        this._checked = Boolean(!isPressed);
        
    }
    static get observedAttributes(){// (3)
        return ['value'];
        // return [/* array of attribute names to monitor for changes */];
    }
    
    attributeChangedCallback(name, oldValue, newValue){// (4)
        // called when one of attributes listed above is modified
    }
    action(){
        this.bar.value+=1;
        if(this.bar.value >= 100){
            let myEvent = new CustomEvent('ce', {
                bubbles: true,
                cancelable: false,
                composed: true,
                detail:{
                    typename: "cut",
                    name: this.data.name,
                    num:1// 将需要传递的数据写在detail中，以便在EventListener中获取
                    // 数据将会在event.detail中得到
                },
            });
            this.dispatchEvent(myEvent);
            this.bar.value = 0;
        }

    }

    quickAction(diffTime){
        if(this._checked){
            for(let i=0;i < Math.floor(diffTime/this.data.baseInterval);i++) {
                let myEvent = new CustomEvent('ce', {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail:{
                        typename: "cut",
                        name: this.data.name,
                        num:1// 将需要传递的数据写在detail中，以便在EventListener中获取
                        // 数据将会在event.detail中得到
                    },
                });
                this.dispatchEvent(myEvent);
            }
        }
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