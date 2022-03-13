class ItemCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        
        
    }


    static get observedAttributes(){// (3)
        return ['value'];
        // return [/* array of attribute names to monitor for changes */];
    }
    
    attributeChangedCallback(name, oldValue, newValue){// (4)
        // called when one of attributes listed above is modified
    }

    
    set data(val){
        this.id = val.p_id;
        document.getElementById("inventory-area").appendChild(this);
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>
                .item{
                    margin-top: 2.5px;
                    height: 60px;
                    width: 60px;
                    padding: 5px;
                    cursor: pointer;
                    border-radius: 5px;
                    background-color: rgba(0, 0, 0, .3);
                    position: relative;
                    margin-right:4px;
                    float: left;
                    border-color:#ff0000 #0000ff;
                }
                .img-container{
                    height: 100%;
                    width: 100%;
                    margin:0 auto;
                }
                .item-img {
                    width: 50px;
                    height: 50px;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 10%;
                    display: block;

                }
                .item span{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, .5);
                    border-radius: 2.5px;
                    padding: 0.5px;
                    color: black;
                }
                
            </style>
    
           
            <div class='item' data-id=${val.id}>
                <div class='img-container'>
                    <img class='item-img' src='./assets/${val.svg}.svg'/>
                </div>
                <span>${val.num}</span>
            </div>
            `

            const tInstance = tippy(this, {
                //content: bankTooltip,
                placement: "top",
                allowHTML: true,
                interactive: false,
                animation: false,
                arrow: true,
                touch: "hold",
                onShow(instance){
                    let html = `
                                <style>
                                .text-center {
                                    text-align: center!important
                                }
                                .m-3 {
                                    margin: 1rem!important
                                }
                                .item-img {
                                    width: 64px;
                                    height: 64px;
                                    pointer-events: none
                                }
                                .m-1 {
                                    margin: .25rem!important
                                }
                                .media-body {
                                    -ms-flex: 1;
                                    flex: 1
                                }
                                </style>
                                <div class="text-center">
                                <div class="media d-flex align-items-center push">
                                <div class="mr-3">
                                    <img class="item-img m-1" src="./assets/${val.svg}.svg">
                                </div>
                                <div class="media-body">
                                    <div class="font-w600">${val.id}</div>
                                    ${val.description}
                                    <div class="font-size-sm">
                                        <img class="skill-icon-xs" src="./assets/${val.svg}.svg">
                                        ${val.description}
                                        <br>
                                    </div>
                                    ${val.description}
                                </div>
                            </div>
                        </div>`;
                    instance.setContent(html);
                },
            });
            //shadowRoot.querySelector('.card').addEventListener('click', this.check.bind(this), false);   
    }

    remove(id){
        this.remove();
    }

}


customElements.define('item-element', ItemCard);
Sortable.create(document.getElementById("inventory-area"),{animation: 150})
/* let items = new ItemCard();
*  items.data={p_id: "farm-area",svg:'protect_item',id:'1',description:'a', num:20}
*/


