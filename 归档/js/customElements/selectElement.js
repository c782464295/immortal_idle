class Dropdown extends HTMLElement{
    constructor(){
        super()
        let template = document.createElement('template');
        template.id = "statistic-dropdown-template";
        template.innerHTML = `<style>
                                select{
                                    color: var(--theme-color);
                                    background-color: var(--content-bg);
                                    width: 20em;
                                    height: 3em;
                                }
                                option {
                                    color: var(--theme-color) !importrant;
                                    background-color: var(--content-bg) !importrant;
                                }
                            </style>
                            <select></select>
                            <slot></slot>
                            `
        const select = this.querySelector('select');
        select.appendChild(template.content.cloneNode(true));

        
        this.addEventListener('slotchange', ev => {      
            let node = this.querySelector('option');
            node && select.append(node); 
        })
        select.selectedIndex = -1;
    }
    
    connectedCallback(){
        this.querySelector('select').addEventListener('change', this.dsHandler.bind(this), false);
    }

    dsHandler(ev){
        //console.log( ev.type, ev.target.textContent )
        //console.log(this.shadowRoot.querySelector('option').innerText);
        /* 自定义数据发送 */
        let myEvent = new CustomEvent('ce', {
            bubbles: true,
            cancelable: false,
            composed: true,
            
            detail:{
                typename: "selectedChange",
                num: this.querySelector('select').options[this.querySelector('select').selectedIndex].text,
                // 将需要传递的数据写在detail中，以便在EventListener中获取
                // 数据将会在event.detail中得到
            },
        });
        this.dispatchEvent(myEvent);

    }
}
customElements.define("drop-down", Dropdown);


/* 用以接收数据
window.addEventListener('selectedChange', function(event){
    // 如果是CustomEvent，传入的数据在event.detail中
    console.log('得到数据为：', event.detail);
    let table = document.querySelector('table-of-data');
      let data = {
        title:'table name',
        headings: [ 'State', 'Place' ],
        rows: [[
          'California',
          '<a href="https://en.wikipedia.org/wiki/Redwood_National_and_State_Parks">Redwood Forest</a>'
        ],
        [ '击杀怪物',
          event.detail.num
        ]]
      };
	table.data = data;
});
*/