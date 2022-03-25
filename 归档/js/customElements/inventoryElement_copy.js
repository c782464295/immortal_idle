class Car extends HTMLElement{
    constructor(){
        // 必须的
        super();
        // 元素创建

        document.getElementById('inventoryContainer').appendChild(this);
        
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    render(){

    }

    connectedCallback(){
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
        if(this.ri==undefined){
            this.ri = this.getRndInteger(0,10);
        }
        this.innerHTML = "<div class='item' data-id=1 data-toggle='popover' data-tooltip='天才地宝'><span>"+this.ri+"</span></div>";
    }
    

    disconnectedCallback(){
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    
    static get observedAttributes(){
        return [/* array of attribute names to monitor for changes */];
    }
    
    attributeChangedCallback(name, oldValue, newValue){
        // called when one of attributes listed above is modified
    }
    
    adoptedCallback(){
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}


customElements.define('car-component', Car);

/***
let table = document.querySelector('table-of-data');
      let data = {
        title:'table name',
        headings: [ 'State', 'Place' ],
        rows: [[
          'California',
          '<a href="https://en.wikipedia.org/wiki/Redwood_National_and_State_Parks">Redwood Forest</a>'
        ],
        [ 'New York',
          '<a href="https://en.wikipedia.org/wiki/List_of_islands_of_New_York">New York Islands</a>'
        ]]
      };
table.data = data;
*/