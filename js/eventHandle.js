class EventHandle{
    constructor(){
        window.addEventListener('selectedChange', this.handler)
    }
    handler(e){
        console.log(e.type);
    }
}