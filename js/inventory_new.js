class inventory{
    constructor(id = 'inventory'){
        this.invent = new Map();
        this.id = id;
        this.sortable = Sortable.create(document.getElementById(this.id),{animation: 150, draggable: '.item'});
    }
    test(){
        this.invent.set(0,10);
        this.invent.set(1,1);
        this.invent.set(2,1);
        this.invent.set(3,1);
        this.invent.set(4,1);
    }
    
    additem(){
        var tmp_node = document.createElement('div');
        tmp_node.className = "item";

        var tmp_node_p = document.getElementById(this.id).appendChild(tmp_node);
        tmp_node_p.appendChild(document.createElement('span')).innerHTML='2';
    }

    update(){
        $("[data-toggle = 'popover']").each(function (){
            var $this = $(this);
            $this.popover({
              html: true,
              placement: "top",
              //container: $this,
              trigger: "hover",
              title: $this[0].getAttribute('data-tooltip')||'',
              content: "Hey, you"
            });
        })
    }

    
    
    set(){

    }
    get(){

    }
    serialize(){
        return JSON.stringify(this);
    }
    deserialize(data){
        this.invent.clear();

    }
}



