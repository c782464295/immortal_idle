'use strict'
// 目前会导致显示问题
function pop_warning(data){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: data,
        showConfirmButton: true,
        //background: '#545',
        timer: 5000
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

export {pop_warning,toast_warning};