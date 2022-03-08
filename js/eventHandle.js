class EventHandle{
    constructor(p){
        this.p = p;
        window.addEventListener('selectedChange', this.handler.bind(this))
    }
    handler(e){
        switch (e.type){
            case 'selectedChange':
                let table = document.querySelector('table-of-data');
                let data = {title:e.detail.num,
                headings: [ '状态', '#' ],rows: []};
                for(let item of this.p.stats.Woodcutting.statistics){
                    data.rows.push([item[0],item[1]]);
                }
                
                table.data = data;
                break;
        }
    }
}

/*
class EventHandle{
    constructor(p){
		this.p = p;
        window.addEventListener('selectedChange', this.handler.bind(this));
        console.log(this.p);;
    }
    handler(e){
        console.log(e.type);
        console.log(this.p.config);
		
    }
}

class Game{
	constructor(){
		this.config = {
            'version': 0.1,
            'GameName': 'Immortal Idle',
        };
		this.ev = new EventHandle(this);
	}
}
*/