class TimeFormatted extends HTMLElement{
    constructor(){
        // 必须的
        super();
        // 元素创建

        this.addEventListener('click', () => alert(Date.now()));


    }
    render(){ // (1)
        let date = new Date(this.getAttribute('datetime') || Date.now());
    
        this.innerHTML = new Intl.DateTimeFormat("default", {
          year: this.getAttribute('year') || undefined,
          month: this.getAttribute('month') || undefined,
          day: this.getAttribute('day') || undefined,
          hour: this.getAttribute('hour') || undefined,
          minute: this.getAttribute('minute') || undefined,
          second: this.getAttribute('second') || undefined,
          timeZoneName: this.getAttribute('time-zone-name') || undefined,
        }).format(date);
    }


    connectedCallback(){// (2)
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
    
    static get observedAttributes(){// (3)
        return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
        // return [/* array of attribute names to monitor for changes */];
    }
    
    attributeChangedCallback(name, oldValue, newValue){// (4)
        // called when one of attributes listed above is modified
        this.render();
    }
    
    adoptedCallback(){
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
    
    // there can be other element methods and properties
}

// let the browser know that <my-element> is served by our new class
customElements.define("time-formatted", TimeFormatted);
/***
 * 自定义元素名称必须有连字符-，例如my-element并且super-button是有效名称，但myelement不是。
 * 这是为了确保内置和自定义 HTML 元素之间没有名称冲突
 */
// 下面的要放在html里
// <time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

// 下面的要放在js里动态更新
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)