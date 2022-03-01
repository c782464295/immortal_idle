class ProgressBar extends HTMLProgressElement{
    constructor(){
        // 必须的
        super();
        // 元素创建
        this.value = 0;
        this.max = 100;
    }

    render(){
        //this.getAttribute('currValue');
    }

    connectedCallback(){
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
        if (!this.rendered){
            this.render();
            this.rendered = true;
        }
    }
    
    disconnectedCallback(){
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    
    static get observedAttributes(){
        return ['value', 'max'];
    }
    
    attributeChangedCallback(name, oldValue, newValue){
        // called when one of attributes listed above is modified
        if(newValue >= 100){
            console.log('max');
        }
        this.render();
    }
    
    adoptedCallback(){
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
    
    // there can be other element methods and properties
}

// let the browser know that <my-element> is served by our new class
// customElements.define("my-element", Ore);
// 或者
//document.createElement("progress-bar");
customElements.define("progress-bar", ProgressBar, {extends: 'progress'}); // (2)
/***
 * 自定义元素名称必须有连字符-，例如my-element并且super-button是有效名称，但myelement不是。
 * 这是为了确保内置和自定义 HTML 元素之间没有名称冲突
 */

//document.getElementById("prog").setAttribute('value',60);
prog.setAttribute('value',60);