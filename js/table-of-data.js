class stasTable extends HTMLElement{
    constructor(){
        // 必须的
        super();
        // 元素创建
        
        
    }

    connectedCallback(){
        //const shadowRoot = this.attachShadow({mode: 'open'});
        //shadowRoot.innerHTML =  
        this.innerHTML = `<table id="table" class="table-of-data"></table>
        <style>
          table.table-of-data { background-color: var(--content-bg);border-collapse: collapse; width: 40%; margin:0 auto;border-radius: 10px;}
          table.table-of-data h5{padding-left: 20px;}
          table.table-of-data th,td {text-align: right; color: var(--theme-color); padding-right: 10px; }
          
          ::-webkit-scrollbar {
              width: 6px;
          } 
          ::-webkit-scrollbar-track {
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
          } 
          ::-webkit-scrollbar-thumb {
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
          }
        </style>`;
    }

    set data(val){
        this._refreshTable(val);
        this._data = val;
    }

    get data(){
        return (this._data || {});
    
    }

    _refreshTable(data){ // add/refresh data in table
        //let tableOfData = this.shadowRoot.children.table;
        let tableOfData = this.children.table;
        let frag = document.createDocumentFragment();
        let tableTitle = document.createElement('h5');
        let tableHeadingRow = document.createElement('tr');

        tableTitle.textContent = data.title;
        frag.appendChild(tableTitle);

        data.headings.forEach(heading => {
            let tableHeading = document.createElement('th');
            tableHeading.textContent = heading;
            tableHeadingRow.appendChild(tableHeading);
        });
        frag.appendChild(tableHeadingRow);
        
        data.rows.forEach(row => {
            let tableRow = document.createElement('tr');
            tableRow.setAttribute("class","drag");
            data.headings.forEach((name, i) => {
              let rowEl = document.createElement('td');
              rowEl.innerHTML = row[i];
              tableRow.appendChild(rowEl);
            });
            frag.appendChild(tableRow);
        });


        tableOfData.innerHTML = ''; //clear the table
        tableOfData.appendChild(frag);
    }
}


customElements.define('table-of-data', stasTable);

/***
let table = document.querySelector('table-of-data');
      let data = {
        title:'table name',
        headings: [ 'State', 'Place' ],
        rows: [[
          'California',
          '<a href="https://en.wikipedia.org/wiki/Redwood_National_and_State_Parks">Redwood Forest</a>'
        ],
        [ '击杀怪物',
          '3000'
        ]]
      };
table.data = data;
*/