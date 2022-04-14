"use strict";
import { game } from '../game.js';

class stasTable extends HTMLElement {
	constructor() {
		// 必须的
		super();
		// 元素创建

		let tickCount = 20;
	}

	connectedCallback() {
		//const shadowRoot = this.attachShadow({mode: 'open'});
		//shadowRoot.innerHTML =  
		this.innerHTML = `<table id="table" class="table-of-data"></table>
				<style>
					table.table-of-data { background-color: var(--content-bg);border-collapse: collapse; width: 80%; margin:0 auto;border-radius: 10px;}
					table.table-of-data h5{padding-left: 20px;}
					table.table-of-data th,td {text-align: right; color: var(--theme-color); padding-right: 10px; }
				</style>`;
	}

	formatDuring(mss) {
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = (mss % (1000 * 60)) / 1000;
		return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
	}

	set data(val) {
		this._refreshTable(val);
		this._data = val;
	}


	render() {
		this.tickCount-=1;
		if(this.tickCount>0){
			return;
		}else{
			this.tickCount = 20;
		}
		

		let data = {
			title: 'Woodcutting',
			headings: ['名称', '#'], rows: []
		};


		for (let item of game.statistics['Woodcutting'].statistics) {
			if(item[0] == 'totalTimeConsume') {
				data.rows.push([item[0], this.formatDuring(item[1])]);
				continue;
			}
			data.rows.push([item[0], item[1]]);
		}
		this.data = data;
	}

	_refreshTable(data) { // add/refresh data in table
		//let tableOfData = this.shadowRoot.children.table;
		if (data == '' || data == undefined || data == null) {
			return;
		}
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
			tableRow.setAttribute("class", "drag");
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

	fresh_auto() {
		let data = {
			title: 'e.detail.num',
			headings: ['状态', '#'], rows: []
		};
		for (let item of this.obj_data) {
			data.rows.push([item[0], item[1]]);
		}

		this.data = data;
	}
}


customElements.define('table-of-data', stasTable);
