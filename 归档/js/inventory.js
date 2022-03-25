class inventory{
    constructor(id = 'inventory'){
        this.invent = new Map();
        this.id = id;
        this.test();
        this.sortable = Sortable.create(document.getElementById(this.id),{animation: 150, draggable: '.item',
            store: {
                /**
                * Get the order of elements. Called once during initialization.
                * @param {Sortable} sortable
                * @returns {Array}
                */
                get: function(sortable) {
                    var order = [...this.invent.keys()];
                    return order;
                }.bind(this),
                /**
                * Save the order of elements. Called onEnd (when the item is dropped).
                * @param {Sortable} sortable
                */
                set: function(sortable) {
                    var order = sortable.toArray();
                    //console.log("Left set = " + order);
                    let tmp_map = new Map(this.invent);
                    this.invent.clear();
                    order.forEach(element => {
                        
                        this.invent.set(Number(element), tmp_map.get(Number(element)));
                    });
                }.bind(this)
            }
        });

    }
    test(){
        this.invent.set(1,1);
        this.invent.set(2,1);
        this.invent.set(3,1);
        this.invent.set(4,1);
        this.invent.set(5,1);
        this.invent.set(6,1);
        this.invent.set(7,1);
        this.invent.set(8,1);
        this.invent.set(93,1);
        this.invent.set(92,1);
        this.invent.set(90,1);
    }
    
    additem(){
        var tmp_node = document.createElement('div');
        tmp_node.className = "item";
        tmp_node.setAttribute("data-id","1");

        var tmp_node_p = document.getElementById(this.id).appendChild(tmp_node);
        tmp_node_p.appendChild(document.createElement('span')).innerHTML='2';
        
    }

    init(){
        $("[data-toggle = 'popover']").each(function (){
            var $this = $(this);
            $this.popover({
              placement: "top",
              //container: $this,
              trigger: "hover",
              //title: $this[0].getAttribute('data-tooltip')||'',
              //content: $this[0].getAttribute('data-tooltip')||'',
              html: true,
              content: "<img class='item-img-popper' src='./assets/protect_item.svg'><font size='3' color='black'>This is some text!</font>",
              sanitize  : false,
            });
            
            
        })

        
    
    }

    update(){
        if(!this.oldindex.equals(this.sortable.toArray())){
            console.log('not equals');
        }
    }
    
    set(){

    }
    get(){

    }

    replacer(key,value){
        if (key=="sortable") return undefined;
        else if (key=="privateProperty2") return undefined;
        else return value;
    }

    reviver(key, value){
        if(typeof value === 'object' && value !== null) {
          if (value.dataType === 'Map') {
            return new Map(value.value);
          }
        }
        
        return value;
    }

    serialize(){
        return JSON.stringify(Array.from(this.invent.entries()),this.replacer);;
    }
    deserialize(data){
        console.log(data);
        this.invent = new Map(JSON.parse(data));
    }
}



