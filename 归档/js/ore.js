// 这是自定义元素，还有许多内置元素
class Ore extends HTMLElement{
    constructor(){
        // 必须的
        super();
        // 元素创建
        
    }

    render(){
        this.innerHTML='a';
    }

    connectedCallback(){
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
        if (!this.rendered){
            this.appendChild(document.getElementById('tmpl').content);
            this.render();
            this.rendered = true;
        }
    }
    
    disconnectedCallback(){
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    
    static get observedAttributes(){
        return [/* array of attribute names to monitor for changes */];
    }
    
    attributeChangedCallback(name, oldValue, newValue){
        // called when one of attributes listed above is modified
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
// document.createElement('mining-ore');
customElements.define("mining-ore", Ore); // (2)
/***
 * 自定义元素名称必须有连字符-，例如my-element并且super-button是有效名称，但myelement不是。
 * 这是为了确保内置和自定义 HTML 元素之间没有名称冲突
 */

