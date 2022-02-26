class inventory{
    constructor(){
        this.invent = new Map();
        this.sortable = null;

    }
    test(){
        this.invent.set(0,10);
        this.invent.set(1,1);
        this.invent.set(2,1);
        this.invent.set(3,1);
        this.invent.set(4,1);
    }


    update(id = 'tress'){
        document.getElementById(id).innerHTML = '';
        if(this.sortable!==null){
            this.sortable.destroy();
        }
        this.invent.forEach(function(value,key,map){
            if(allitems[key] == undefined){
                console.log(new Error('id not found'));
            }
            console.log(allitems[key]);
            document.getElementById(id).innerHTML +=  "<div class='bank-item' data-toggle='popover' data-id="+ key +" data-tooltip='"+allitems[key].name+"'><img class='bank-img p-1' src='./"+allitems[key].media+"'></img></div>";
        });
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

        this.sortable = Sortable.create(document.getElementById(id),{});
        this.sortable.sort(this.sortable.toArray().sort());

        
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

