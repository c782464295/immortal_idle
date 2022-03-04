class stasTable extends HTMLElement{
    constructor(){
        // 必须的
        super();
        // 元素创建
        
        
    }

    connectedCallback(){
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML =  `<table id="table" class="table-of-data"></table>
        <style>


          table.table-of-data td, table.table-of-data th { border-bottom: 1px solid #ddd; text-align: right; }
          table.table-of-data { border-collapse: collapse; width: 40%; margin:0 auto;background:#232a35;color:#f5f5f5;border-top:4px solid 	#008000;border-radius: 5px;perspective: 5px;}
          table.table-of-data th, table.table-of-data td { padding: 8px; }
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
        let tableOfData = this.shadowRoot.children.table;
        let frag = document.createDocumentFragment();
        let tableTitle = document.createElement('h4');
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
        [ 'New York',
          '<a href="https://en.wikipedia.org/wiki/List_of_islands_of_New_York">New York Islands</a>'
        ]]
      };
table.data = data;
*/