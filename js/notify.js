'use strict'

// 目前会导致显示问题
function pop_warning(data){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: data,
        showConfirmButton: true,
        //background: '#545',
        timer: 500000
    })
}



function toast_warning(data){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.warning(data);
}
// 自定义
let SwalLocale = Swal.mixin({
    didOpen: ()=>{
        
    }
    ,
    customClass: {
        container: '',
        popup: 'pop-up2',
        header: '',
        title: '...',
        closeButton: '...',
        icon: '...',
        image: '...',
        content: '...',
        htmlContainer: '...',
        input: '...',
        inputLabel: '...',
        validationMessage: '...',
        actions: '...',
        confirmButton: '...',
        denyButton: '...',
        cancelButton: '...',
        loader: '...',
        footer: '....',
        timerProgressBar: '....',
    },
    //background: "transparent", 
    //backgroundColor: var(--popup-bg);
    buttonsStyling: false,
});
SwalLocale.fire();
function gpNotify(qty) {
    if (1) {
        let textClass = "success";
        let plus = "+";
        if (qty < 0) {
            textClass = "danger";
            plus = "";
        }
        Toastify({
            text: `<div>
                    <img src=../assets/svg/coins.svg height="32px">
                    <span>+20</span>
                   </div>`,
            duration: 2000,
            //className:'',
            gravity: "bottom",
            position: "center",
            style: {
                background: "transparent",
            },
            onClick: function(){}, // Callback after click
            stopOnFocus: false,
            escapeMarkup: false,
        }).showToast();

    }
}
function itemNotify(itemID, qty) {
    if (showItemNotify === 1) {
        clearTimeout(itemNotifyTimer);
        itemNotifyToProcess.push({
            itemID: itemID,
            qty: qty
        });
        itemNotifyTimer = setTimeout(function() {
            for (let i = 0; i < itemNotifyToProcess.length; i++)
                processItemNotify(itemNotifyToProcess[i].itemID, itemNotifyToProcess[i].qty);
            itemNotifyToProcess = [];
        }, 50);
    }
}
function stunNotify(damage) {
    Toastify({
        text: `<div class="text-center"><img class="notification-img" src="${cdnMedia(SKILLS[Skills.Thieving].media)}"><span class="badge badge-warning">${getLangString("TOASTS", "STUNNED")} </span> <span class="badge badge-danger"> ${templateLangString("TOASTS", "MINUS_HP", {
            damage: `${damage}`
        })}</span></div>`,
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function bankFullNotify() {
    Toastify({
        text: `<div class="text-center"><img class="notification-img" src="${cdnMedia("assets/media/main/bank_header.svg")}"><span class="badge badge-danger">${getLangString("TOASTS", "FULL_BANK")}</span></div>`,
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
class NotificationQueue {
    constructor(maxNotifiactions = 15) {
        this.maxNotifiactions = maxNotifiactions;
        this.queue = [];
    }
    notify() {

    }
    add(notification) {
        if (this.queue.length === this.maxNotifiactions) {
            this.queue.splice(0, 1);
        }
        this.queue.push(notification);
    }
    clear() {
        this.queue = [];
    }
}

export {pop_warning,toast_warning,gpNotify,NotificationQueue};