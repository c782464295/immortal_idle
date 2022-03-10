class EventHandle{
    constructor(p){
        this.p = p;
        window.addEventListener('ce', this.handler.bind(this))
    }
    handler(e){
        switch (e.detail.typename){
            case 'selectedChange':
                let table = document.querySelector('table-of-data');
                let data = {title:e.detail.num,
                headings: [ '状态', '#' ],rows: []};
                for(let item of this.p.stats.Woodcutting.statistics){
                    data.rows.push([item[0],item[1]]);
                }
                
                table.data = data;
                table.obj_data = this.p.stats.Woodcutting.statistics;
                break;
            case "cut":
                console.log(this.p.stats.Woodcutting.statistics);
                this.p.stats.Woodcutting.inc(e.detail.name);
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